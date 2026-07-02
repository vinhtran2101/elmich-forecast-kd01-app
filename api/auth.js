import {
  clearSessionCookies,
  createStateCookie,
  getBaseUrl,
  getCurrentAuth,
  getLarkRedirectUri,
  isAuthRequired,
  isLarkConfigured,
  resolveLarkUser,
  setSessionCookie,
  validateState,
} from "../server/lib/auth.js";
import { getAuthorizeUrl, getLarkProfileFromCode } from "../server/lib/lark.js";
import { sendJson, sendMethodNotAllowed } from "../server/lib/http.js";

function getQuery(req) {
  const url = new URL(req.url || "", "http://localhost");
  return Object.fromEntries(url.searchParams.entries());
}

function getRoute(req) {
  const query = req.query || getQuery(req);
  return query.route || query.path || "";
}

function redirect(res, location) {
  res.statusCode = 302;
  res.setHeader("Location", location);
  res.end();
}

async function handleMe(req, res) {
  if (req.method !== "GET") return sendMethodNotAllowed(res, ["GET"]);
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const required = isAuthRequired();
  const configured = isLarkConfigured();

  try {
    if (!required) {
      return sendJson(res, 200, {
        ok: true,
        auth: {
          required: false,
          configured,
          authenticated: false,
          mode: "mock",
          loginUrl: "/api/auth/lark/start",
        },
      });
    }

    const auth = await getCurrentAuth(req);
    return sendJson(res, 200, {
      ok: true,
      auth: {
        required: true,
        configured,
        authenticated: auth.authenticated,
        blocked: auth.blocked || false,
        user: auth.user || null,
        role: auth.role || null,
        permissions: auth.permissions || null,
        loginUrl: "/api/auth/lark/start",
        logoutUrl: "/api/auth/logout",
      },
    });
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      error: "auth_me_failed",
      message: error.message,
      auth: {
        required,
        configured,
        authenticated: false,
        loginUrl: "/api/auth/lark/start",
      },
    });
  }
}

async function handleLogout(req, res) {
  if (!["GET", "POST"].includes(req.method)) return sendMethodNotAllowed(res, ["GET", "POST"]);

  clearSessionCookies(res);
  if (req.method === "GET") return redirect(res, "/?logged_out=1");
  return sendJson(res, 200, { ok: true });
}

async function handleLarkStart(req, res) {
  if (req.method !== "GET") return sendMethodNotAllowed(res, ["GET"]);

  if (!isLarkConfigured()) {
    return sendJson(res, 503, {
      ok: false,
      error: "lark_not_configured",
      message: "Thiếu LARK_APP_ID hoặc LARK_APP_SECRET trên server.",
    });
  }

  const state = createStateCookie(res);
  const redirectUri = getLarkRedirectUri(req);
  return redirect(
    res,
    getAuthorizeUrl({
      appId: process.env.LARK_APP_ID,
      redirectUri,
      state,
    })
  );
}

async function handleLarkCallback(req, res) {
  if (req.method !== "GET") return sendMethodNotAllowed(res, ["GET"]);

  const query = req.query || getQuery(req);
  const code = query.code;
  const state = query.state;
  const baseUrl = getBaseUrl(req);

  if (!code) {
    return sendJson(res, 400, {
      ok: false,
      error: "missing_lark_code",
      message: "Lark callback thiếu authorization code.",
    });
  }

  if (!validateState(req, state)) {
    clearSessionCookies(res);
    return sendJson(res, 400, {
      ok: false,
      error: "invalid_lark_state",
      message: "Phiên đăng nhập Lark không hợp lệ hoặc đã hết hạn.",
    });
  }

  try {
    const profile = await getLarkProfileFromCode(code);
    const user = await resolveLarkUser(profile);

    if (user.status !== "active") {
      clearSessionCookies(res);
      return redirect(res, `${baseUrl}/?auth_error=account_inactive`);
    }

    setSessionCookie(res, user.id);
    return redirect(res, `${baseUrl}/?auth=lark`);
  } catch (error) {
    clearSessionCookies(res);
    return redirect(res, `${baseUrl}/?auth_error=${encodeURIComponent(error.statusCode === 403 ? "not_allowed" : "lark_failed")}`);
  }
}

export default async function handler(req, res) {
  const route = getRoute(req);

  if (route === "me") return handleMe(req, res);
  if (route === "logout") return handleLogout(req, res);
  if (route === "lark-start") return handleLarkStart(req, res);
  if (route === "lark-callback") return handleLarkCallback(req, res);

  return sendJson(res, 404, {
    ok: false,
    error: "auth_route_not_found",
  });
}

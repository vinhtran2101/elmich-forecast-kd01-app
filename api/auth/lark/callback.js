import {
  clearSessionCookies,
  getBaseUrl,
  setSessionCookie,
  validateState,
  resolveLarkUser,
} from "../../lib/auth.js";
import { getLarkProfileFromCode } from "../../lib/lark.js";
import { sendJson, sendMethodNotAllowed } from "../../lib/http.js";

function getQuery(req) {
  const url = new URL(req.url || "", "http://localhost");
  return Object.fromEntries(url.searchParams.entries());
}

function redirect(res, location) {
  res.statusCode = 302;
  res.setHeader("Location", location);
  res.end();
}

export default async function handler(req, res) {
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

import {
  getCurrentAuth,
  isAuthRequired,
  isLarkConfigured,
} from "../lib/auth.js";
import { sendJson, sendMethodNotAllowed } from "../lib/http.js";

export default async function handler(req, res) {
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

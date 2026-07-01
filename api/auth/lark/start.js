import {
  createStateCookie,
  getLarkRedirectUri,
  isLarkConfigured,
} from "../../lib/auth.js";
import { getAuthorizeUrl } from "../../lib/lark.js";
import { sendJson, sendMethodNotAllowed } from "../../lib/http.js";

export default async function handler(req, res) {
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
  const url = getAuthorizeUrl({
    appId: process.env.LARK_APP_ID,
    redirectUri,
    state,
  });

  res.statusCode = 302;
  res.setHeader("Location", url);
  res.end();
}

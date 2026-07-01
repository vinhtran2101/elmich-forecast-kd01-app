import { clearSessionCookies } from "../lib/auth.js";
import { sendJson, sendMethodNotAllowed } from "../lib/http.js";

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) return sendMethodNotAllowed(res, ["GET", "POST"]);

  clearSessionCookies(res);
  if (req.method === "GET") {
    res.statusCode = 302;
    res.setHeader("Location", "/?logged_out=1");
    res.end();
    return;
  }

  return sendJson(res, 200, { ok: true });
}

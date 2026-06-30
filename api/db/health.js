import { hasDatabaseUrl, query } from "../lib/db.js";
import { sendJson, sendMethodNotAllowed } from "../lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return sendMethodNotAllowed(res, ["GET"]);

  if (!hasDatabaseUrl()) {
    return sendJson(res, 200, {
      ok: false,
      databaseUrlConfigured: false,
      message: "DATABASE_URL is not configured yet.",
    });
  }

  try {
    const result = await query("select now() as now, current_database() as database_name");
    return sendJson(res, 200, {
      ok: true,
      databaseUrlConfigured: true,
      database: result.rows[0],
    });
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      databaseUrlConfigured: true,
      error: "database_health_failed",
      message: error.message,
    });
  }
}

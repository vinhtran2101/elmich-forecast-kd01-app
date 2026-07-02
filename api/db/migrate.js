import { readFile } from "node:fs/promises";
import path from "node:path";
import { query } from "../../server/lib/db.js";
import { assertSetupToken, sendJson, sendMethodNotAllowed } from "../../server/lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);
  if (!assertSetupToken(req, res)) return undefined;

  try {
    const schemaPath = path.join(process.cwd(), "database", "schema.sql");
    const schemaSql = await readFile(schemaPath, "utf8");
    await query(schemaSql);

    return sendJson(res, 200, {
      ok: true,
      message: "Database schema applied.",
    });
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      error: "migration_failed",
      message: error.message,
    });
  }
}


import { withTransaction } from "../../server/lib/db.js";
import { requireModulePermission } from "../../server/lib/auth.js";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../../server/lib/http.js";

const allowedLevels = new Set(["full", "scoped", "view", "locked"]);

function dataScopeForLevel(level) {
  if (level === "full") return "all";
  if (level === "locked") return "none";
  return "assigned";
}

export default async function handler(req, res) {
  if (!["POST", "PATCH"].includes(req.method)) return sendMethodNotAllowed(res, ["POST", "PATCH"]);
  const guard = await requireModulePermission(req, res, "Quáº£n trá»‹ há»‡ thá»‘ng", ["full", "scoped"]);
  if (!guard.ok) return;

  try {
    const body = await readJsonBody(req);
    const roleId = body.roleId || body.roleCode;
    const moduleValue = body.moduleId || body.moduleCode || body.module;
    const level = body.level || body.permissionLevel;

    if (!roleId || !moduleValue || !allowedLevels.has(level)) {
      return sendJson(res, 400, {
        ok: false,
        error: "invalid_permission_payload",
        message: "Thiáº¿u vai trÃ², khu vá»±c hoáº·c quyá»n há»£p lá»‡.",
      });
    }

    const saved = await withTransaction(async (client) => {
      const roleResult = await client.query(
        "select * from roles where code = $1 or id::text = $1 limit 1",
        [roleId]
      );
      const role = roleResult.rows[0];
      if (!role) {
        const error = new Error("KhÃ´ng tÃ¬m tháº¥y vai trÃ².");
        error.statusCode = 404;
        throw error;
      }
      if (role.code === "admin") {
        const error = new Error("KhÃ´ng cáº­p nháº­t quyá»n cá»§a Admin máº·c Ä‘á»‹nh.");
        error.statusCode = 400;
        throw error;
      }

      const moduleResult = await client.query(
        "select * from modules where code = $1 or name = $1 or id::text = $1 limit 1",
        [moduleValue]
      );
      const module = moduleResult.rows[0];
      if (!module) {
        const error = new Error("KhÃ´ng tÃ¬m tháº¥y khu vá»±c quyá»n.");
        error.statusCode = 404;
        throw error;
      }

      const permissionResult = await client.query(
        `
          insert into role_permissions (role_id, module_id, permission_level, data_scope)
          values ($1, $2, $3, $4)
          on conflict (role_id, module_id) do update set
            permission_level = excluded.permission_level,
            data_scope = excluded.data_scope,
            updated_at = now()
          returning *
        `,
        [role.id, module.id, level, dataScopeForLevel(level)]
      );

      await client.query(
        `
          insert into activity_logs (entity_type, entity_id, action, message, metadata)
          values ('permission', $1, 'permission_update', $2, $3::jsonb)
        `,
        [
          role.id,
          `Cáº­p nháº­t quyá»n: ${role.name}`,
          JSON.stringify({ detail: `${module.name} -> ${level}`, tone: "green", iconKey: "checkCircle", createdAtLabel: "Vá»«a xong" }),
        ]
      );

      return permissionResult.rows[0];
    });

    return sendJson(res, 200, { ok: true, permission: saved });
  } catch (error) {
    return sendJson(res, error.statusCode || 500, {
      ok: false,
      error: "save_permission_failed",
      message: error.message,
    });
  }
}


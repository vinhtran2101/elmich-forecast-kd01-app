import { withTransaction } from "../../server/lib/db.js";
import { requireModulePermission } from "../../server/lib/auth.js";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../../server/lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);
  const guard = await requireModulePermission(req, res, "Quáº£n trá»‹ há»‡ thá»‘ng", ["full", "scoped"]);
  if (!guard.ok) return;

  try {
    const body = await readJsonBody(req);
    const roleId = body.roleId || body.roleCode;
    const userIds = Array.isArray(body.userIds) ? body.userIds : [];

    if (!roleId || !userIds.length) {
      return sendJson(res, 400, {
        ok: false,
        error: "invalid_role_users_payload",
        message: "Thiáº¿u vai trÃ² hoáº·c danh sÃ¡ch nhÃ¢n sá»±.",
      });
    }

    const summary = await withTransaction(async (client) => {
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

      let changed = 0;
      for (const userId of userIds) {
        await client.query("delete from user_roles where user_id = $1", [userId]);
        await client.query(
          `
            insert into user_roles (user_id, role_id, scope_note)
            values ($1, $2, $3)
          `,
          [userId, role.id, role.scope_label || "Theo phÃ¢n quyá»n"]
        );
        changed += 1;
      }

      await client.query(
        `
          insert into activity_logs (entity_type, entity_id, action, message, metadata)
          values ('permission', $1, 'role_users_update', $2, $3::jsonb)
        `,
        [
          role.id,
          `GÃ¡n nhÃ¢n sá»± vÃ o vai trÃ²: ${role.name}`,
          JSON.stringify({ detail: `ÄÃ£ gÃ¡n ${changed} nhÃ¢n sá»±`, tone: "green", iconKey: "checkCircle", createdAtLabel: "Vá»«a xong" }),
        ]
      );

      return { role, changed };
    });

    return sendJson(res, 200, { ok: true, ...summary });
  } catch (error) {
    return sendJson(res, error.statusCode || 500, {
      ok: false,
      error: "save_role_users_failed",
      message: error.message,
    });
  }
}


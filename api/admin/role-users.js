import { withTransaction } from "../lib/db.js";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);

  try {
    const body = await readJsonBody(req);
    const roleId = body.roleId || body.roleCode;
    const userIds = Array.isArray(body.userIds) ? body.userIds : [];

    if (!roleId || !userIds.length) {
      return sendJson(res, 400, {
        ok: false,
        error: "invalid_role_users_payload",
        message: "Thiếu vai trò hoặc danh sách nhân sự.",
      });
    }

    const summary = await withTransaction(async (client) => {
      const roleResult = await client.query(
        "select * from roles where code = $1 or id::text = $1 limit 1",
        [roleId]
      );
      const role = roleResult.rows[0];
      if (!role) {
        const error = new Error("Không tìm thấy vai trò.");
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
            on conflict (user_id, role_id) do update set scope_note = excluded.scope_note
          `,
          [userId, role.id, role.scope_label || "Theo phân quyền"]
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
          `Gán nhân sự vào vai trò: ${role.name}`,
          JSON.stringify({ detail: `Đã gán ${changed} nhân sự`, tone: "green", iconKey: "checkCircle", createdAtLabel: "Vừa xong" }),
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

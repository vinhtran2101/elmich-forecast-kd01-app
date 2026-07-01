import { withTransaction } from "../lib/db.js";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../lib/http.js";

function normalizeStatus(status) {
  const value = String(status || "Active").toLowerCase();
  return value.includes("inactive") ? "inactive" : "active";
}

function initialsFromName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "NV";
  return parts.slice(-2).map((part) => part[0]).join("").toUpperCase();
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function defaultEmployeeCode() {
  return `NV-${String(Date.now()).slice(-6)}`;
}

async function findRole(client, roleValue) {
  const result = await client.query(
    "select id, name, scope_label from roles where code = $1 or name = $1 limit 1",
    [roleValue]
  );
  return result.rows[0] || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);

  try {
    const body = await readJsonBody(req);
    const user = body.user || body;
    const fullName = String(user.name || user.fullName || "").trim();
    const email = String(user.email || "").trim().toLowerCase();

    if (!fullName) {
      return sendJson(res, 400, { ok: false, error: "missing_name", message: "Tên tài khoản là bắt buộc." });
    }
    if (!email) {
      return sendJson(res, 400, { ok: false, error: "missing_email", message: "Email đăng nhập là bắt buộc." });
    }

    const savedUser = await withTransaction(async (client) => {
      const params = [
        user.employeeCode || defaultEmployeeCode(),
        fullName,
        email,
        user.phone || null,
        user.department || null,
        user.title || null,
        normalizeStatus(user.status),
        user.initials || initialsFromName(fullName),
        user.tone || "blue",
      ];

      let result;
      if (isUuid(user.id)) {
        result = await client.query(
          `
            update users
            set employee_code = $2,
                full_name = $3,
                email = $4,
                phone = $5,
                department = $6,
                title = $7,
                status = $8,
                initials = $9,
                tone = $10,
                updated_at = now()
            where id = $1
            returning *
          `,
          [user.id, ...params]
        );
      }

      if (!result?.rowCount) {
        result = await client.query(
          `
            insert into users (employee_code, full_name, email, phone, department, title, status, initials, tone)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            on conflict (email) do update set
              employee_code = excluded.employee_code,
              full_name = excluded.full_name,
              phone = excluded.phone,
              department = excluded.department,
              title = excluded.title,
              status = excluded.status,
              initials = excluded.initials,
              tone = excluded.tone,
              updated_at = now()
            returning *
          `,
          params
        );
      }

      const row = result.rows[0];
      const role = await findRole(client, user.role || body.role || "viewer");
      if (role) {
        await client.query("delete from user_roles where user_id = $1", [row.id]);
        await client.query(
          `
            insert into user_roles (user_id, role_id, scope_note)
            values ($1, $2, $3)
            on conflict (user_id, role_id) do update set scope_note = excluded.scope_note
          `,
          [row.id, role.id, role.scope_label || "Theo phân quyền"]
        );
      }

      await client.query(
        `
          insert into activity_logs (actor_id, entity_type, entity_id, action, message, metadata)
          values ($1, 'user', $1, $2, $3, $4::jsonb)
        `,
        [
          row.id,
          isUuid(user.id) ? "user_update" : "user_create",
          `${isUuid(user.id) ? "Cập nhật" : "Tạo"} tài khoản: ${row.full_name}`,
          JSON.stringify({ detail: role ? `Gán vai trò ${role.name}` : "Chưa gán vai trò", tone: "green", iconKey: "checkCircle", createdAtLabel: "Vừa xong" }),
        ]
      );

      return row;
    });

    return sendJson(res, 200, { ok: true, user: savedUser });
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      error: "save_user_failed",
      message: error.message,
    });
  }
}

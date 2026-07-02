import { withTransaction } from "../../server/lib/db.js";
import { requireModulePermission } from "../../server/lib/auth.js";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../../server/lib/http.js";

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 42);
}

async function findRole(client, roleId) {
  const result = await client.query(
    "select * from roles where code = $1 or id::text = $1 limit 1",
    [roleId]
  );
  return result.rows[0] || null;
}

async function createRole(client, body) {
  const name = String(body.name || "").trim();
  if (!name) {
    const error = new Error("TÃªn vai trÃ² lÃ  báº¯t buá»™c.");
    error.statusCode = 400;
    throw error;
  }

  const codeBase = slugify(name) || "role";
  const code = `custom_${codeBase}_${Date.now().toString(36)}`;
  const roleResult = await client.query(
    `
      insert into roles (code, name, description, scope_type, scope_label, risk, is_system)
      values ($1, $2, $3, 'custom', 'Theo phÃ¢n quyá»n', 'Trung bÃ¬nh', false)
      returning *
    `,
    [code, name, body.description || "Vai trÃ² tÃ¹y chá»‰nh cho Forecast KD01"]
  );
  const role = roleResult.rows[0];

  const modules = await client.query("select id from modules order by sort_order");
  for (const module of modules.rows) {
    await client.query(
      `
        insert into role_permissions (role_id, module_id, permission_level, data_scope)
        values ($1, $2, 'view', 'assigned')
        on conflict (role_id, module_id) do nothing
      `,
      [role.id, module.id]
    );
  }

  await client.query(
    `
      insert into activity_logs (entity_type, entity_id, action, message, metadata)
      values ('permission', $1, 'role_create', $2, $3::jsonb)
    `,
    [
      role.id,
      `Táº¡o vai trÃ²: ${role.name}`,
      JSON.stringify({ detail: "Táº¡o role má»›i vÃ  khá»Ÿi táº¡o quyá»n Chá»‰ xem", tone: "green", iconKey: "checkCircle", createdAtLabel: "Vá»«a xong" }),
    ]
  );

  return role;
}

async function deleteRole(client, roleId) {
  const role = await findRole(client, roleId);
  if (!role) {
    const error = new Error("KhÃ´ng tÃ¬m tháº¥y vai trÃ².");
    error.statusCode = 404;
    throw error;
  }
  if (role.code === "admin") {
    const error = new Error("Vai trÃ² Admin máº·c Ä‘á»‹nh khÃ´ng Ä‘Æ°á»£c xÃ³a.");
    error.statusCode = 400;
    throw error;
  }

  await client.query("delete from user_roles where role_id = $1", [role.id]);
  await client.query("delete from roles where id = $1", [role.id]);
  await client.query(
    `
      insert into activity_logs (entity_type, entity_id, action, message, metadata)
      values ('permission', null, 'role_delete', $1, $2::jsonb)
    `,
    [
      `XÃ³a vai trÃ²: ${role.name}`,
      JSON.stringify({ detail: "ÄÃ£ gá»¡ vai trÃ² khá»i danh sÃ¡ch phÃ¢n quyá»n", tone: "orange", iconKey: "alertTriangle", createdAtLabel: "Vá»«a xong" }),
    ]
  );

  return role;
}

export default async function handler(req, res) {
  if (!["POST", "DELETE"].includes(req.method)) return sendMethodNotAllowed(res, ["POST", "DELETE"]);
  const guard = await requireModulePermission(req, res, "Quáº£n trá»‹ há»‡ thá»‘ng", ["full", "scoped"]);
  if (!guard.ok) return;

  try {
    const body = await readJsonBody(req);
    const result = await withTransaction(async (client) => {
      if (req.method === "DELETE") return deleteRole(client, body.roleId || body.id);
      return createRole(client, body.role || body);
    });

    return sendJson(res, 200, { ok: true, role: result });
  } catch (error) {
    return sendJson(res, error.statusCode || 500, {
      ok: false,
      error: req.method === "DELETE" ? "delete_role_failed" : "create_role_failed",
      message: error.message,
    });
  }
}


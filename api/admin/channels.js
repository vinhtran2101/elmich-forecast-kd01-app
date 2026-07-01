import { withTransaction } from "../lib/db.js";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../lib/http.js";

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 42);
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

async function findUserId(client, value) {
  if (!value) return null;
  if (isUuid(value)) return value;

  const result = await client.query(
    "select id from users where email = $1 or full_name = $1 or title = $1 limit 1",
    [value]
  );
  return result.rows[0]?.id || null;
}

async function saveAssignment(client, channelId, roleCode, userId) {
  if (!userId) return;
  await client.query(
    `
      insert into channel_assignments (channel_id, user_id, role_code, effective_from)
      values ($1, $2, $3, current_date)
      on conflict (channel_id, user_id, role_code, effective_from) do update set
        effective_to = null
    `,
    [channelId, userId, roleCode]
  );
}

async function upsertChannel(client, payload) {
  const name = String(payload.channel || payload.name || "").trim();
  if (!name) {
    const error = new Error("Tên kênh là bắt buộc.");
    error.statusCode = 400;
    throw error;
  }

  const code = payload.code || slugify(name) || `CHANNEL_${Date.now()}`;
  const result = await client.query(
    `
      insert into sales_channels (code, name, short_name, region, status, icon_key, icon_tone, marker)
      values ($1, $2, $3, $4, 'active', $5, $6, $7)
      on conflict (code) do update set
        name = excluded.name,
        short_name = excluded.short_name,
        region = excluded.region,
        status = 'active',
        icon_key = excluded.icon_key,
        icon_tone = excluded.icon_tone,
        marker = excluded.marker,
        updated_at = now()
      returning *
    `,
    [
      code,
      name,
      payload.shortName || name,
      payload.region || "",
      payload.iconKey || "store",
      payload.iconTone || "blue",
      payload.tone || payload.marker || "blue",
    ]
  );
  const channel = result.rows[0];

  await client.query(
    "delete from channel_assignments where channel_id = $1 and role_code in ('GDKD', 'RSM', 'ASM')",
    [channel.id]
  );

  const directorId = await findUserId(client, payload.directorId || payload.director);
  const rsmId = await findUserId(client, payload.rsmId || payload.rsm);
  const asmInputs = payload.asmIds || payload.asms || [];

  await saveAssignment(client, channel.id, "GDKD", directorId);
  await saveAssignment(client, channel.id, "RSM", rsmId);
  for (const asmInput of asmInputs) {
    await saveAssignment(client, channel.id, "ASM", await findUserId(client, asmInput));
  }

  await client.query(
    `
      insert into activity_logs (entity_type, entity_id, action, message, metadata)
      values ('sales_channel', $1, 'channel_upsert', $2, $3::jsonb)
    `,
    [
      channel.id,
      `Cập nhật khung kênh: ${channel.name}`,
      JSON.stringify({ detail: `Gán ${asmInputs.length} ASM`, tone: "green", iconKey: "checkCircle", createdAtLabel: "Vừa xong" }),
    ]
  );

  return channel;
}

async function deactivateChannel(client, payload) {
  const channelRef = payload.channelId || payload.code || payload.channel;
  const result = await client.query(
    "update sales_channels set status = 'inactive', updated_at = now() where id::text = $1 or code = $1 or name = $1 returning *",
    [channelRef]
  );
  const channel = result.rows[0];
  if (!channel) {
    const error = new Error("Không tìm thấy kênh.");
    error.statusCode = 404;
    throw error;
  }

  await client.query("delete from channel_assignments where channel_id = $1", [channel.id]);
  await client.query(
    `
      insert into activity_logs (entity_type, entity_id, action, message, metadata)
      values ('sales_channel', $1, 'channel_deactivate', $2, $3::jsonb)
    `,
    [
      channel.id,
      `Ngưng hoạt động khung kênh: ${channel.name}`,
      JSON.stringify({ detail: "Ẩn khỏi cấu hình khung Forecast mới", tone: "orange", iconKey: "alertTriangle", createdAtLabel: "Vừa xong" }),
    ]
  );

  return channel;
}

export default async function handler(req, res) {
  if (!["POST", "DELETE"].includes(req.method)) return sendMethodNotAllowed(res, ["POST", "DELETE"]);

  try {
    const body = await readJsonBody(req);
    const channel = await withTransaction((client) =>
      req.method === "DELETE" ? deactivateChannel(client, body) : upsertChannel(client, body.channel || body)
    );

    return sendJson(res, 200, { ok: true, channel });
  } catch (error) {
    return sendJson(res, error.statusCode || 500, {
      ok: false,
      error: req.method === "DELETE" ? "delete_channel_failed" : "save_channel_failed",
      message: error.message,
    });
  }
}

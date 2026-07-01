import crypto from "node:crypto";
import { query, withTransaction } from "./db.js";
import { sendJson } from "./http.js";

export const SESSION_COOKIE = "forecast_kd01_session";
export const LARK_STATE_COOKIE = "forecast_kd01_lark_state";

function isTruthy(value) {
  return ["1", "true", "yes", "on", "lark"].includes(String(value || "").toLowerCase());
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function parseCookies(req) {
  return String(req.headers.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const index = part.indexOf("=");
      if (index === -1) return acc;
      acc[decodeURIComponent(part.slice(0, index))] = decodeURIComponent(part.slice(index + 1));
      return acc;
    }, {});
}

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET || process.env.SESSION_SECRET || process.env.ADMIN_SETUP_TOKEN || "";
}

function signPayload(payload) {
  const secret = getSessionSecret();
  if (!secret) throw new Error("AUTH_SESSION_SECRET is not configured.");
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left || "");
  const rightBuffer = Buffer.from(right || "");
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAuthRequired() {
  return isTruthy(process.env.AUTH_REQUIRED || process.env.LARK_AUTH_REQUIRED);
}

export function isLarkConfigured() {
  return Boolean(process.env.LARK_APP_ID && process.env.LARK_APP_SECRET);
}

export function getBaseUrl(req) {
  if (process.env.APP_BASE_URL) return process.env.APP_BASE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "127.0.0.1:5173";
  return `${proto}://${host}`;
}

export function getLarkRedirectUri(req) {
  return process.env.LARK_REDIRECT_URI || `${getBaseUrl(req)}/api/auth/lark/callback`;
}

export function getCookie(req, name) {
  return parseCookies(req)[name] || "";
}

export function appendCookie(res, cookie) {
  const current = res.getHeader("Set-Cookie");
  if (!current) {
    res.setHeader("Set-Cookie", cookie);
    return;
  }
  res.setHeader("Set-Cookie", Array.isArray(current) ? [...current, cookie] : [current, cookie]);
}

export function serializeCookie(name, value, options = {}) {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];
  parts.push(`Path=${options.path || "/"}`);
  if (options.httpOnly !== false) parts.push("HttpOnly");
  if (options.secure !== false) parts.push("Secure");
  parts.push(`SameSite=${options.sameSite || "Lax"}`);
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.expires) parts.push(`Expires=${options.expires.toUTCString()}`);
  return parts.join("; ");
}

export function clearSessionCookies(res) {
  const expired = new Date(0);
  appendCookie(res, serializeCookie(SESSION_COOKIE, "", { maxAge: 0, expires: expired }));
  appendCookie(res, serializeCookie(LARK_STATE_COOKIE, "", { maxAge: 0, expires: expired }));
}

export function createStateCookie(res) {
  const state = crypto.randomBytes(24).toString("base64url");
  appendCookie(res, serializeCookie(LARK_STATE_COOKIE, state, { maxAge: 10 * 60 }));
  return state;
}

export function validateState(req, state) {
  const storedState = getCookie(req, LARK_STATE_COOKIE);
  return Boolean(storedState && state && safeEqual(storedState, state));
}

export function createSessionToken(userId) {
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(JSON.stringify({
    sub: userId,
    iat: now,
    exp: now + Number(process.env.AUTH_SESSION_MAX_AGE || 60 * 60 * 24 * 7),
  }));
  return `${payload}.${signPayload(payload)}`;
}

export function setSessionCookie(res, userId) {
  appendCookie(
    res,
    serializeCookie(SESSION_COOKIE, createSessionToken(userId), {
      maxAge: Number(process.env.AUTH_SESSION_MAX_AGE || 60 * 60 * 24 * 7),
    })
  );
}

export function readSession(req) {
  const token = getCookie(req, SESSION_COOKIE);
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signPayload(payload), signature)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session.sub || Number(session.exp || 0) < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

function mapPermissionRows(rows) {
  return rows.reduce((acc, row) => {
    acc[row.module_name] = row.permission_level;
    acc[row.module_code] = row.permission_level;
    return acc;
  }, {});
}

export async function getCurrentAuth(req) {
  const session = readSession(req);
  if (!session?.sub) return { authenticated: false };

  const userResult = await query(
    `
      select
        u.id,
        u.employee_code,
        u.full_name,
        u.email,
        u.department,
        u.title,
        u.status,
        u.initials,
        u.tone,
        u.avatar_url,
        u.lark_open_id,
        u.lark_union_id,
        r.id as role_uuid,
        r.code as role_code,
        r.name as role_name,
        r.description as role_description,
        r.scope_label as role_scope_label
      from users u
      left join user_roles ur on ur.user_id = u.id
      left join roles r on r.id = ur.role_id
      where u.id = $1
      limit 1
    `,
    [session.sub]
  );

  const row = userResult.rows[0];
  if (!row || row.status !== "active") {
    return { authenticated: false, blocked: true };
  }

  const permissionResult = await query(
    `
      select m.code as module_code, m.name as module_name, rp.permission_level
      from role_permissions rp
      join modules m on m.id = rp.module_id
      where rp.role_id = $1
    `,
    [row.role_uuid]
  );

  return {
    authenticated: true,
    user: {
      id: row.id,
      employeeCode: row.employee_code,
      name: row.full_name,
      email: row.email,
      department: row.department,
      title: row.title,
      status: row.status,
      initials: row.initials,
      tone: row.tone,
      avatarUrl: row.avatar_url,
      larkOpenId: row.lark_open_id,
      larkUnionId: row.lark_union_id,
    },
    role: row.role_code ? {
      id: row.role_code,
      code: row.role_code,
      name: row.role_name,
      description: row.role_description,
      scopeLabel: row.role_scope_label,
    } : null,
    permissions: mapPermissionRows(permissionResult.rows),
  };
}

export async function resolveLarkUser(profile) {
  const openId = profile.openId || null;
  const unionId = profile.unionId || null;
  const email = String(profile.email || "").trim().toLowerCase();
  const name = profile.name || email || "Lark User";

  if (!openId && !unionId && !email) {
    const error = new Error("Lark không trả về email/open_id để đối chiếu tài khoản.");
    error.statusCode = 400;
    throw error;
  }

  return withTransaction(async (client) => {
    const result = await client.query(
      `
        select *
        from users
        where ($1::text is not null and lark_open_id = $1)
           or ($2::text is not null and lark_union_id = $2)
           or ($3::text <> '' and lower(email) = $3)
        order by updated_at desc
        limit 1
      `,
      [openId, unionId, email]
    );

    let user = result.rows[0];
    if (!user) {
      if (!isTruthy(process.env.LARK_AUTO_PROVISION)) {
        const error = new Error("Tài khoản Lark này chưa được cấp quyền trong app Forecast KD01.");
        error.statusCode = 403;
        throw error;
      }

      const viewerRole = await client.query("select id, scope_label from roles where code = 'viewer' limit 1");
      const userResult = await client.query(
        `
          insert into users (employee_code, full_name, email, department, title, status, initials, tone, auth_provider, lark_open_id, lark_union_id, lark_user_id, avatar_url, last_login_at)
          values ($1, $2, $3, $4, $5, 'inactive', $6, 'slate', 'lark', $7, $8, $9, $10, now())
          returning *
        `,
        [
          `LK-${Date.now().toString().slice(-6)}`,
          name,
          email || `${openId || unionId}@lark.local`,
          profile.department || "",
          profile.title || "",
          profile.initials || name.slice(0, 2).toUpperCase(),
          openId,
          unionId,
          profile.userId || null,
          profile.avatarUrl || null,
        ]
      );
      user = userResult.rows[0];

      if (viewerRole.rows[0]) {
        await client.query(
          "insert into user_roles (user_id, role_id, scope_note) values ($1, $2, $3) on conflict do nothing",
          [user.id, viewerRole.rows[0].id, viewerRole.rows[0].scope_label || "Chờ cấp quyền"]
        );
      }
    } else {
      const updateResult = await client.query(
        `
          update users
          set full_name = coalesce(nullif($2, ''), full_name),
              email = coalesce(nullif($3, ''), email),
              auth_provider = 'lark',
              lark_open_id = coalesce($4, lark_open_id),
              lark_union_id = coalesce($5, lark_union_id),
              lark_user_id = coalesce($6, lark_user_id),
              avatar_url = coalesce($7, avatar_url),
              last_login_at = now(),
              updated_at = now()
          where id = $1
          returning *
        `,
        [user.id, name, email, openId, unionId, profile.userId || null, profile.avatarUrl || null]
      );
      user = updateResult.rows[0];
    }

    await client.query(
      `
        insert into activity_logs (actor_id, entity_type, entity_id, action, message, metadata)
        values ($1, 'user', $1, 'lark_login', $2, $3::jsonb)
      `,
      [
        user.id,
        `Đăng nhập Lark: ${user.full_name}`,
        JSON.stringify({ detail: "Xác thực qua Lark", tone: "blue", iconKey: "checkCircle", createdAtLabel: "Vừa xong" }),
      ]
    );

    return user;
  });
}

export async function requireAuth(req, res) {
  if (!isAuthRequired()) return { ok: true, enforced: false };

  const auth = await getCurrentAuth(req);
  if (!auth.authenticated) {
    sendJson(res, 401, {
      ok: false,
      error: auth.blocked ? "account_blocked" : "not_authenticated",
      message: auth.blocked ? "Tài khoản đã bị khóa hoặc inactive." : "Bạn cần đăng nhập Lark để tiếp tục.",
    });
    return { ok: false };
  }

  return { ok: true, enforced: true, auth };
}

export async function requireModulePermission(req, res, moduleName, allowedLevels = ["full", "scoped"]) {
  const guard = await requireAuth(req, res);
  if (!guard.ok) return guard;
  if (!guard.enforced) return guard;

  const level = guard.auth.permissions?.[moduleName];
  if (!allowedLevels.includes(level)) {
    sendJson(res, 403, {
      ok: false,
      error: "forbidden",
      message: "Bạn không có quyền thực hiện thao tác này.",
    });
    return { ok: false };
  }

  return guard;
}

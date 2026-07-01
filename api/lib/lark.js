function getOpenBaseUrl() {
  return (process.env.LARK_OPEN_BASE_URL || "https://open.larksuite.com").replace(/\/$/, "");
}

export function getAuthorizeUrl({ appId, redirectUri, state }) {
  const authorizeUrl = process.env.LARK_AUTHORIZE_URL || "https://accounts.larksuite.com/open-apis/authen/v1/authorize";
  const url = new URL(authorizeUrl);
  url.searchParams.set("app_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("response_type", "code");
  if (process.env.LARK_AUTH_SCOPE) url.searchParams.set("scope", process.env.LARK_AUTH_SCOPE);
  return url.toString();
}

async function readLarkJson(response, fallbackError) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || (payload.code !== undefined && payload.code !== 0)) {
    const error = new Error(payload.msg || payload.message || fallbackError);
    error.statusCode = response.status || 502;
    error.payload = payload;
    throw error;
  }
  return payload;
}

async function getAppAccessToken() {
  const response = await fetch(`${getOpenBaseUrl()}/open-apis/auth/v3/app_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      app_id: process.env.LARK_APP_ID,
      app_secret: process.env.LARK_APP_SECRET,
    }),
  });
  const payload = await readLarkJson(response, "Không lấy được app_access_token từ Lark.");
  const token = payload.app_access_token || payload.data?.app_access_token;
  if (!token) throw new Error("Lark không trả app_access_token.");
  return token;
}

async function exchangeCodeForUserAccessToken(code, appAccessToken) {
  const response = await fetch(`${getOpenBaseUrl()}/open-apis/authen/v1/access_token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${appAccessToken}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
    }),
  });
  const payload = await readLarkJson(response, "Không đổi được authorization code của Lark.");
  const data = payload.data || payload;
  const token = data.access_token || data.user_access_token;
  if (!token) throw new Error("Lark không trả user access token.");
  return token;
}

async function getUserInfo(userAccessToken) {
  const response = await fetch(`${getOpenBaseUrl()}/open-apis/authen/v1/user_info`, {
    headers: { Authorization: `Bearer ${userAccessToken}` },
  });
  const payload = await readLarkJson(response, "Không lấy được thông tin user Lark.");
  return payload.data || payload;
}

function normalizeProfile(data) {
  const email = data.enterprise_email || data.email || data.user?.enterprise_email || data.user?.email || "";
  const name = data.name || data.en_name || data.user?.name || data.user?.en_name || email;
  return {
    openId: data.open_id || data.user?.open_id || "",
    unionId: data.union_id || data.user?.union_id || "",
    userId: data.user_id || data.user?.user_id || "",
    name,
    email,
    avatarUrl: data.avatar_url || data.avatar_thumb || data.user?.avatar_url || "",
    initials: name
      ? name.trim().split(/\s+/).slice(-2).map((part) => part[0]).join("").toUpperCase()
      : "LK",
  };
}

export async function getLarkProfileFromCode(code) {
  const appAccessToken = await getAppAccessToken();
  const userAccessToken = await exchangeCodeForUserAccessToken(code, appAccessToken);
  const userInfo = await getUserInfo(userAccessToken);
  return normalizeProfile(userInfo);
}

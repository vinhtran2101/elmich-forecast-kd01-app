export function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload, null, 2));
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return req.body ? JSON.parse(req.body) : {};

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8").trim();
  return rawBody ? JSON.parse(rawBody) : {};
}

export function sendMethodNotAllowed(res, allowedMethods = ["GET"]) {
  res.setHeader("Allow", allowedMethods.join(", "));
  sendJson(res, 405, {
    ok: false,
    error: "method_not_allowed",
    allowedMethods,
  });
}

export function getBearerToken(req) {
  const header = req.headers.authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

export function assertSetupToken(req, res) {
  const configuredToken = process.env.ADMIN_SETUP_TOKEN;
  if (!configuredToken) {
    sendJson(res, 503, {
      ok: false,
      error: "setup_token_missing",
      message: "ADMIN_SETUP_TOKEN is not configured on the server.",
    });
    return false;
  }

  const requestToken = req.headers["x-setup-token"] || getBearerToken(req);
  if (requestToken !== configuredToken) {
    sendJson(res, 401, {
      ok: false,
      error: "unauthorized",
      message: "Invalid setup token.",
    });
    return false;
  }

  return true;
}

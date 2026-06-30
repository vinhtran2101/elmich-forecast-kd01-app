import pg from "pg";

const { Pool } = pg;

let pool;

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

function shouldDisableSsl(connectionString) {
  return process.env.PGSSLMODE === "disable" || connectionString.includes("sslmode=disable");
}

export function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      max: Number(process.env.PG_POOL_MAX || 3),
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
      ssl: shouldDisableSsl(connectionString) ? false : { rejectUnauthorized: false },
    });
  }

  return pool;
}

export async function query(sql, params = []) {
  return getPool().query(sql, params);
}

export async function withTransaction(callback) {
  const client = await getPool().connect();
  try {
    await client.query("begin");
    const result = await callback(client);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

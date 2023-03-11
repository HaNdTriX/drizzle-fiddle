import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Attach the pool connection to the global object so that it can be reused
// across lambda invocations. This solution is far from ideal, but it's the
// only way to get around the fact that lambda functions are stateless.
// We sill might hit connection limits, so we should think about some kind of
// bouncer proxy that allows us to reuse connections.
const globalForMysql = globalThis as unknown as {
  mysqlPoolConnection: mysql.Pool;
};

export const poolConnection =
  globalForMysql.mysqlPoolConnection ||
  mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  });

const db = drizzle(poolConnection);

export default db;

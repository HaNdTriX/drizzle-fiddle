import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: ["db/schema.ts"],
} satisfies Config;

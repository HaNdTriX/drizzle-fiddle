import {
  mysqlTable,
  datetime,
  index,
  varchar,
  text,
  serial,
  int,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm/sql";

export const pages = mysqlTable(
  "pages",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    authorId: int("author_id")
      .notNull()
      .references(() => users.id, { onUpdate: "cascade" }),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
  },
  (table) => ({
    authorIdFkey: index("author_id_fkey").on(table.authorId),
  })
);

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: datetime("email_verified", { mode: "string", fsp: 3 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user"),
  createdAt: datetime("created_at", { mode: "string", fsp: 3 })
    .default(sql`(CURRENT_TIMESTAMP(3))`)
    .notNull(),
  updatedAt: datetime("updated_at", { mode: "string", fsp: 3 })
    .default(sql`(CURRENT_TIMESTAMP(3))`)
    .notNull(),
});

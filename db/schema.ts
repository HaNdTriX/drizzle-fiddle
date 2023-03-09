import {
  mysqlTable,
  int,
  index,
  uniqueIndex,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const pages = mysqlTable(
  "pages",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    authorId: int("author_id")
      .notNull()
      .references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default("CURRENT_TIMESTAMP")
      .notNull(),
  },
  (table) => ({
    author: index("author").on(table.authorId),
    slug: uniqueIndex("slug").on(table.slug),
  })
);

export const users = mysqlTable(
  "users",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).default(
      "CURRENT_TIMESTAMP"
    ),
  },
  (table) => ({
    name: uniqueIndex("name").on(table.name),
  })
);

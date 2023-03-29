import {
  sqliteTable,
  index,
  uniqueIndex,
  blob,
  text,
  integer,
  foreignKey,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("email_verified", { mode: "timestamp" }),
    image: text("image"),
    role: text("role", { enum: ["admin", "user"] })
      .default("user")
      .notNull(),
    createdAt: integer("created_at", {
      mode: "timestamp",
    })
      .defaultCurrentTimestamp()
      .notNull(),
    updatedAt: integer("updated_at", {
      mode: "timestamp",
    })
      .defaultCurrentTimestamp()
      .notNull(),
  },
  (table) => ({
    email: uniqueIndex("email").on(table.email),
  })
);

export const accounts = sqliteTable(
  "accounts",
  {
    id: integer("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    provider: text("provider"),
    providerAccountId: text("provider_account_id"),
    type: text("type"),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    scope: text("scope"),
    token_type: text("token_type"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    createdAt: integer("created_at", {
      mode: "timestamp",
    })
      .defaultCurrentTimestamp()
      .notNull(),
    updatedAt: integer("updated_at", {
      mode: "timestamp",
    })
      .defaultCurrentTimestamp()
      .notNull(),
  },
  (table) => ({
    uniqueIndex: index("unique_index").on(
      table.provider,
      table.providerAccountId
    ),
    userFk: foreignKey(() => ({
      columns: [table.userId],
      foreignColumns: [users.id],
    })),
  })
);

export const verificationTokens = sqliteTable(
  "verification_tokens",
  {
    id: integer("id").primaryKey(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    uniqueIndex: index("unique_index").on(table.identifier, table.token),
  })
);

export const sessions = sqliteTable(
  "sessions",
  {
    id: integer("id").primaryKey(),
    sessionToken: text("session_token").notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", {
      mode: "timestamp",
    })
      .defaultCurrentTimestamp()
      .notNull(),
    updatedAt: integer("updated_at", {
      mode: "timestamp",
    })
      .defaultCurrentTimestamp()
      .notNull(),
  },
  (table) => ({
    sessionToken: index("session_token").on(table.sessionToken),
    userFk: foreignKey(() => ({
      columns: [table.userId],
      foreignColumns: [users.id],
    })),
  })
);

export const pages = sqliteTable(
  "pages",
  {
    id: integer("id").primaryKey(),
    slug: text("slug").notNull(),
    coverPhoto: blob("cover_photo", {
      mode: "buffer",
    }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    authorId: integer("author_id")
      .notNull()
      .references(() => users.id),
    createdAt: integer("created_at", {
      mode: "timestamp",
    })
      .defaultCurrentTimestamp()
      .notNull(),
    updatedAt: integer("updated_at", {
      mode: "timestamp",
    })
      .defaultCurrentTimestamp()
      .notNull(),
  },
  (table) => ({
    slug: uniqueIndex("slug").on(table.slug),
    userFk: foreignKey(() => ({
      columns: [table.authorId],
      foreignColumns: [users.id],
    })),
  })
);

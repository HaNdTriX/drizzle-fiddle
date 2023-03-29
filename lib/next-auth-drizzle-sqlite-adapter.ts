import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import type { Adapter } from "next-auth/adapters";
import { users, sessions, verificationTokens, accounts } from "../db/schema";
import { eq, and } from "drizzle-orm/expressions";
import type {
  SQLiteTableWithColumns,
  SQLiteInteger,
  SQLiteText,
  SQLiteTimestamp,
} from "drizzle-orm/sqlite-core";

type Schema = {
  users: SQLiteTableWithColumns<{
    name: "users";
    schema: undefined;
    columns: {
      id: SQLiteInteger<{
        tableName: "users";
        data: number;
        name: "id";
        driverParam: number;
        notNull: true;
        hasDefault: true;
      }>;
      name: SQLiteText<{
        tableName: "users";
        name: "name";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      email: SQLiteText<{
        tableName: "users";
        data: string;
        name: "email";
        driverParam: string;
        hasDefault: false;
        enum: [string, ...string[]];
        notNull: true;
      }>;
      emailVerified: SQLiteTimestamp<{
        tableName: "users";
        name: "email_verified";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
      }>;
      image: SQLiteText<{
        tableName: "users";
        name: "image";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      role: SQLiteText<{
        tableName: "users";
        data: "user" | "admin";
        name: "role";
        driverParam: string;
        hasDefault: true;
        enum: ["admin", "user"];
        notNull: true;
      }>;
      createdAt: SQLiteTimestamp<{
        tableName: "users";
        data: Date;
        name: "created_at";
        driverParam: number;
        hasDefault: true;
        notNull: true;
      }>;
      updatedAt: SQLiteTimestamp<{
        tableName: "users";
        data: Date;
        name: "updated_at";
        driverParam: number;
        hasDefault: true;
        notNull: true;
      }>;
    };
  }>;
  sessions: SQLiteTableWithColumns<{
    name: "sessions";
    schema: undefined;
    columns: {
      id: SQLiteInteger<{
        tableName: "sessions";
        data: number;
        name: "id";
        driverParam: number;
        notNull: true;
        hasDefault: true;
      }>;
      sessionToken: SQLiteText<{
        tableName: "sessions";
        data: string;
        name: "session_token";
        driverParam: string;
        hasDefault: false;
        enum: [string, ...string[]];
        notNull: true;
      }>;
      userId: SQLiteInteger<{
        tableName: "sessions";
        data: number;
        name: "user_id";
        driverParam: number;
        hasDefault: false;
        notNull: true;
      }>;
      expires: SQLiteTimestamp<{
        tableName: "sessions";
        data: Date;
        name: "expires";
        driverParam: number;
        hasDefault: false;
        notNull: true;
      }>;
      createdAt: SQLiteTimestamp<{
        tableName: "sessions";
        data: Date;
        name: "created_at";
        driverParam: number;
        hasDefault: true;
        notNull: true;
      }>;
      updatedAt: SQLiteTimestamp<{
        tableName: "sessions";
        data: Date;
        name: "updated_at";
        driverParam: number;
        hasDefault: true;
        notNull: true;
      }>;
    };
  }>;
  verificationTokens: SQLiteTableWithColumns<{
    name: "verification_tokens";
    schema: undefined;
    columns: {
      id: SQLiteInteger<{
        tableName: "verification_tokens";
        data: number;
        name: "id";
        driverParam: number;
        notNull: true;
        hasDefault: true;
      }>;
      identifier: SQLiteText<{
        tableName: "verification_tokens";
        data: string;
        name: "identifier";
        driverParam: string;
        hasDefault: false;
        enum: [string, ...string[]];
        notNull: true;
      }>;
      token: SQLiteText<{
        tableName: "verification_tokens";
        data: string;
        name: "token";
        driverParam: string;
        hasDefault: false;
        enum: [string, ...string[]];
        notNull: true;
      }>;
      expires: SQLiteTimestamp<{
        tableName: "verification_tokens";
        data: Date;
        name: "expires";
        driverParam: number;
        hasDefault: false;
        notNull: true;
      }>;
    };
  }>;
  accounts: SQLiteTableWithColumns<{
    name: "accounts";
    schema: undefined;
    columns: {
      id: SQLiteInteger<{
        tableName: "accounts";
        data: number;
        name: "id";
        driverParam: number;
        notNull: true;
        hasDefault: true;
      }>;
      userId: SQLiteInteger<{
        tableName: "accounts";
        data: number;
        name: "user_id";
        driverParam: number;
        hasDefault: false;
        notNull: true;
      }>;
      provider: SQLiteText<{
        tableName: "accounts";
        name: "provider";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      providerAccountId: SQLiteText<{
        tableName: "accounts";
        name: "provider_account_id";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      type: SQLiteText<{
        tableName: "accounts";
        name: "type";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      refresh_token: SQLiteText<{
        tableName: "accounts";
        name: "refresh_token";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      access_token: SQLiteText<{
        tableName: "accounts";
        name: "access_token";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      expires_at: SQLiteInteger<{
        tableName: "accounts";
        name: "expires_at";
        data: number;
        driverParam: number;
        notNull: false;
        hasDefault: false;
      }>;
      scope: SQLiteText<{
        tableName: "accounts";
        name: "scope";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      token_type: SQLiteText<{
        tableName: "accounts";
        name: "token_type";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      id_token: SQLiteText<{
        tableName: "accounts";
        name: "id_token";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      session_state: SQLiteText<{
        tableName: "accounts";
        name: "session_state";
        data: string;
        driverParam: string;
        enum: [string, ...string[]];
        notNull: false;
        hasDefault: false;
      }>;
      createdAt: SQLiteTimestamp<{
        tableName: "accounts";
        data: Date;
        name: "created_at";
        driverParam: number;
        hasDefault: true;
        notNull: true;
      }>;
      updatedAt: SQLiteTimestamp<{
        tableName: "accounts";
        data: Date;
        name: "updated_at";
        driverParam: number;
        hasDefault: true;
        notNull: true;
      }>;
    };
  }>;
};

export function DrizzleAdapter(
  db: BetterSQLite3Database,
  schema: Schema
): Adapter {
  return {
    async createUser(data) {
      const user = await db.insert(schema.users).values(data).returning().get();
      return {
        ...user,
        id: String(user.id),
      };
    },
    async getUser(id) {
      const user = await db
        .select()
        .from(schema.users)
        .where(eq(users.id, Number(id)))
        .get();
      return user
        ? {
            ...user,
            id: String(user.id),
          }
        : null;
    },
    async getUserByEmail(email) {
      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(users.email, email))
        .limit(1)
        .all();

      return user
        ? {
            ...user,
            id: String(user.id),
          }
        : null;
    },
    async getUserByAccount({ provider, providerAccountId, ...data }) {
      const [result] = await db
        .select({ user: schema.users })
        .from(schema.users)
        .innerJoin(
          schema.accounts,
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        )
        .all();

      const user = result?.user;
      return user
        ? {
            ...user,
            id: String(user.id),
          }
        : null;
    },
    async updateUser({ id, ...data }) {
      if (!id) throw new Error("id is required to update user");
      const user = await db
        .update(schema.users)
        .set(data)
        .where(eq(users.id, Number(id)))
        .returning()
        .get();
      return {
        ...user,
        id: String(user.id),
      };
    },
    async deleteUser(id) {
      await db
        .delete(schema.users)
        .where(eq(users.id, Number(id)))
        .run();
    },
    async linkAccount({ userId, ...data }) {
      await db
        .insert(schema.accounts)
        .values({
          userId: Number(userId),
          ...data,
        })
        .run();
    },
    async unlinkAccount({ provider, providerAccountId, ...other }) {
      await db
        .delete(schema.accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        )
        .run();
    },
    async getSessionAndUser(sessionToken) {
      const userAndSession = await db
        .select({ user: schema.users, session: schema.sessions })
        .from(schema.sessions)
        .innerJoin(schema.users, eq(users.id, sessions.userId))
        .where(eq(sessions.sessionToken, sessionToken))
        .get();

      if (!userAndSession) return null;

      return {
        user: {
          ...userAndSession.user,
          id: String(userAndSession.user.id),
        },
        session: {
          ...userAndSession.session,
          userId: String(userAndSession.session.userId),
        },
      };
    },
    async deleteSession(sessionToken) {
      await db
        .delete(schema.sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .run();
    },
    async createSession({ userId, ...data }) {
      const session = await db
        .insert(schema.sessions)
        .values({
          userId: Number(userId),
          ...data,
        })
        .returning()
        .get();
      return {
        ...session,
        userId: String(session.userId),
      };
    },
    async updateSession({ sessionToken, ...data }) {
      const session = await db
        .update(schema.sessions)
        .set({
          ...data,
          userId: Number(data.userId),
        })
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .get();
      if (!session) throw new Error("session not found");
      return {
        ...session,
        userId: String(session.userId),
      };
    },
    async createVerificationToken(data) {
      return db
        .insert(schema.verificationTokens)
        .values(data)
        .returning()
        .get();
    },
    async useVerificationToken({ identifier, token }) {
      const verificationToken = await db
        .select()
        .from(schema.verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token)
          )
        )
        .get();

      if (!verificationToken) return null;

      await db
        .delete(schema.verificationTokens)
        .where(eq(verificationTokens.id, verificationToken.id))
        .run();

      return verificationToken;
    },
  };
}

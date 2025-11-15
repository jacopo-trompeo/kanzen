import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthClient } from "better-auth/react";
import { reactStartCookies } from "better-auth/react-start";
import { env } from "@/env";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [env.CORS_ORIGIN ?? ""],
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  plugins: [reactStartCookies()],
});

export const authClient = createAuthClient();

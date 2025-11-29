import { createServerOnlyFn } from "@tanstack/react-start";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { db } from "@/domains/shared/server/db";
import * as schema from "@/domains/shared/server/db/schema/auth";
import { env } from "@/env";

const getAuthConfig = createServerOnlyFn(() =>
  betterAuth({
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
  }),
);

export const auth = getAuthConfig();

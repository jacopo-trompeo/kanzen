import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
  schema: "./src/server/db/schema",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  casing: "snake_case",
  dbCredentials: {
    url: env.DATABASE_URL ?? "",
  },
});

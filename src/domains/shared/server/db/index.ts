import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env";
import * as authSchema from "./schema/auth";
import * as relations from "./schema/relations";
import * as settingsSchema from "./schema/settings";

const getDatabse = createServerOnlyFn(() =>
  drizzle(env.DATABASE_URL, {
    casing: "snake_case",
    schema: {
      ...authSchema,
      ...settingsSchema,
      ...relations,
    },
  }),
);

export const db = getDatabse();

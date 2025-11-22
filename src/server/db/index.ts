import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env";

const getDatabse = createServerOnlyFn(() => drizzle(env.DATABASE_URL));

export const db = getDatabse();

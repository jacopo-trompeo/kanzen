import { sql } from "drizzle-orm";
import { check, integer, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import * as z from "zod";
import { user } from "./auth";

export const globalSettings = pgTable("global_settings", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  theme: text("theme", { enum: ["light", "dark", "system"] })
    .default("system")
    .notNull(),
});

export const textHookerSettings = pgTable(
  "text_hooker_settings",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => user.id, { onDelete: "cascade" }),
    fontSize: integer("font_size").default(20).notNull(),
    webSocketUrl: text("websocket_url").default("ws://localhost:6677"),
  },
  (table) => [
    check("font_size_min_value", sql`${table.fontSize} >= 1`),
    check(
      "websocket_url_format",
      sql`${table.webSocketUrl} IS NULL OR ${table.webSocketUrl} ~ '^wss?://.+'`,
    ),
  ],
);

export const TextHookerSettingsInsertSchema = createInsertSchema(
  textHookerSettings,
  {
    fontSize: (schema) =>
      schema.min(1, "Font size must be at least 1px").default(20),
    webSocketUrl: (schema) =>
      schema
        .regex(
          /^wss?:\/\/.+/,
          "WebSocket url must start with either ws:// or wss://",
        )
        .or(z.literal(""))
        .optional(),
  },
)
  .omit({ userId: true })
  .partial();

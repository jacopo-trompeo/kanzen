import type { message } from "@/domains/shared/server/db/schema/chat";

export type Message = typeof message.$inferSelect;

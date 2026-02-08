import type * as z from "zod";
import type { UpdateChatTitleRequestSchema } from "@/domains/ai-chat/types/schemas";
import type { chat, message } from "@/domains/shared/server/db/schema/chat";

export type Message = typeof message.$inferSelect;
export type Chat = typeof chat.$inferSelect;

export type ChatsPageData = {
  chats: Chat[];
  hasMore: boolean;
};

export type UpdateChatTitleParams = z.infer<
  typeof UpdateChatTitleRequestSchema
>;

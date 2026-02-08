import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import {
  ChatBaseRequestSchema,
  UpdateChatTitleRequestSchema,
} from "@/domains/ai-chat/types/schemas";
import { authMiddleware } from "@/domains/auth/middleware";
import { db } from "@/domains/shared/server/db";
import { chat } from "@/domains/shared/server/db/schema/chat";
import { PaginatedRequestSchema } from "@/domains/shared/types/schemas";

export const getUserChats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(PaginatedRequestSchema)
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id;
    const chats = await db.query.chat.findMany({
      where: (chat, { eq }) => eq(chat.userId, userId),
      orderBy: (chat, { desc }) => [desc(chat.updatedAt)],
      limit: data.limit,
      offset: data.offset,
    });
    return {
      chats,
      hasMore: chats.length === data.limit,
    };
  });

export const updateChatTitle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(UpdateChatTitleRequestSchema)
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id;

    await db
      .update(chat)
      .set({ title: data.title })
      .where(and(eq(chat.id, data.chatId), eq(chat.userId, userId)));
  });

export const deleteChat = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(ChatBaseRequestSchema)
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id;

    await db
      .delete(chat)
      .where(and(eq(chat.id, data.chatId), eq(chat.userId, userId)));
  });

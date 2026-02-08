import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import {
  ChatBaseRequestSchema,
  GetUserChatsRequestSchema,
  MessageInsertSchema,
  UpdateChatTitleRequestSchema,
} from "@/domains/ai-chat/types/schemas";
import { authMiddleware } from "@/domains/auth/middleware";
import { db } from "@/domains/shared/server/db";
import { chat, message } from "@/domains/shared/server/db/schema/chat";

export const getChatFirstUserMessage = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(ChatBaseRequestSchema)
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id;

    return await db.query.message.findFirst({
      where: (message, { eq, and, exists }) =>
        and(
          eq(message.chatId, data.chatId),
          eq(message.role, "user"),
          exists(
            db
              .select()
              .from(chat)
              .where(and(eq(chat.id, message.chatId), eq(chat.userId, userId))),
          ),
        ),
    });
  });

export const getChatMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(ChatBaseRequestSchema)
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id;

    return await db.query.message.findMany({
      where: (message, { eq, and, exists }) =>
        and(
          eq(message.chatId, data.chatId),
          exists(
            db
              .select()
              .from(chat)
              .where(and(eq(chat.id, data.chatId), eq(chat.userId, userId))),
          ),
        ),
      orderBy: (message, { asc }) => [asc(message.createdAt)],
    });
  });

export const saveChatMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(MessageInsertSchema)
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id;

    await db.transaction(async (tx) => {
      await tx
        .insert(chat)
        .values({ id: data.chatId, userId })
        .onConflictDoNothing({ target: chat.id });

      await tx.insert(message).values({
        chatId: data.chatId,
        role: data.role,
        content: data.content,
      });
    });
  });

export const getUserChats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(GetUserChatsRequestSchema)
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

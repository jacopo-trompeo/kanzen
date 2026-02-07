import { createServerFn } from "@tanstack/react-start";
import {
  GetChatMessagesRequestSchema,
  MessageInsertSchema,
} from "@/domains/ai-chat/types/schemas";
import { authMiddleware } from "@/domains/auth/middleware";
import { db } from "@/domains/shared/server/db";
import { chat, message } from "@/domains/shared/server/db/schema/chat";

export const saveChatMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(MessageInsertSchema)
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id;
    const existingChat = await db.query.chat.findFirst({
      where: (chat, { eq, and }) =>
        and(eq(chat.id, data.chatId), eq(chat.userId, userId)),
      columns: { userId: true },
    });

    if (!existingChat) {
      await db.insert(chat).values({
        id: data.chatId,
        userId: userId,
      });
    }

    await db.insert(message).values({
      chatId: data.chatId,
      role: data.role,
      content: data.content,
    });
  });

export const getChatMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(GetChatMessagesRequestSchema)
  .handler(async ({ data, context }) => {
    const userId = context.session.user.id;
    const existingChat = await db.query.chat.findFirst({
      where: (chat, { eq, and }) =>
        and(eq(chat.id, data.chatId), eq(chat.userId, userId)),
    });

    if (!existingChat) {
      throw new Error("Chat not found");
    }

    return await db.query.message.findMany({
      where: (message, { eq }) => eq(message.chatId, data.chatId),
      orderBy: (message, { asc }) => [asc(message.createdAt)],
    });
  });

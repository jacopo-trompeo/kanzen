import { relations } from "drizzle-orm";
import { user } from "./auth";
import { chat, message } from "./chat";
import { aiChatSettings, globalSettings, textHookerSettings } from "./settings";

export const userRelations = relations(user, ({ one, many }) => ({
  globalSettings: one(globalSettings, {
    fields: [user.id],
    references: [globalSettings.userId],
  }),
  textHookerSettings: one(textHookerSettings, {
    fields: [user.id],
    references: [textHookerSettings.userId],
  }),
  aiChatSettings: one(aiChatSettings, {
    fields: [user.id],
    references: [aiChatSettings.userId],
  }),
  chats: many(chat),
}));

export const chatRelations = relations(chat, ({ one, many }) => ({
  user: one(user, {
    fields: [chat.userId],
    references: [user.id],
  }),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, {
    fields: [message.chatId],
    references: [chat.id],
  }),
}));

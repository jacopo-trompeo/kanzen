import { relations } from "drizzle-orm";
import { user } from "./auth";
import { aiChatSettings, globalSettings, textHookerSettings } from "./settings";

export const userRelations = relations(user, ({ one }) => ({
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
}));

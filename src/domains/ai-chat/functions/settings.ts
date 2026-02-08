import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { authMiddleware } from "@/domains/auth/middleware";
import { db } from "@/domains/shared/server/db";
import {
  AiChatSettingsInsertSchema,
  aiChatSettings,
} from "@/domains/shared/server/db/schema/settings";
import { decrypt, encrypt } from "@/domains/shared/utils/encryption";

export const getAiChatSettings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const settings = await db.query.aiChatSettings.findFirst({
      where: eq(aiChatSettings.userId, context.session.user.id),
    });

    if (!settings) {
      return null;
    }

    const apiKey = settings.apiKey ? decrypt(settings.apiKey) : settings.apiKey;

    return {
      ...settings,
      apiKey,
    };
  });

export const updateAiChatSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(AiChatSettingsInsertSchema)
  .handler(async ({ context, data }) => {
    const userId = context.session.user.id;

    const existing = await db.query.aiChatSettings.findFirst({
      where: eq(aiChatSettings.userId, userId),
    });

    const apiKey = data.apiKey ? encrypt(data.apiKey) : data.apiKey;

    if (existing) {
      await db
        .update(aiChatSettings)
        .set({
          apiKey: apiKey !== undefined ? apiKey : existing.apiKey,
          model: data.model !== undefined ? data.model : existing.model,
          systemPrompt:
            data.systemPrompt !== undefined
              ? data.systemPrompt
              : existing.systemPrompt,
        })
        .where(eq(aiChatSettings.userId, userId));
    } else {
      await db.insert(aiChatSettings).values({
        userId,
        apiKey,
        model: data.model,
        systemPrompt: data.systemPrompt,
      });
    }
  });

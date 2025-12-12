import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { authMiddleware } from "@/domains/auth/middleware";
import { db } from "@/domains/shared/server/db";
import {
  TextHookerSettingsSchema,
  textHookerSettings,
} from "@/domains/shared/server/db/schema/settings";

export const getTextHookerSettings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const settings = await db.query.textHookerSettings.findFirst({
      where: eq(textHookerSettings.userId, context.session.user.id),
    });

    return settings;
  });

export const updateTextHookerSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(TextHookerSettingsSchema.omit({ userId: true }).partial())
  .handler(async ({ context, data }) => {
    await db
      .update(textHookerSettings)
      .set({
        fontSize: data.fontSize,
        webSocketUrl: data.webSocketUrl,
      })
      .where(eq(textHookerSettings.userId, context.session.user.id));
  });

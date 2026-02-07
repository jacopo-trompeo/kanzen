import { GeminiTextModels } from "@tanstack/ai-gemini";
import { GROK_CHAT_MODELS } from "@tanstack/ai-grok";
import { OPENAI_CHAT_MODELS } from "@tanstack/ai-openai";
import { createInsertSchema } from "drizzle-zod";
import * as z from "zod";
import { message } from "@/domains/shared/server/db/schema/chat";
import { MESSAGE_ROLE_OPTIONS } from "./constants";

export const MessageRoleSchema = z
  .enum(MESSAGE_ROLE_OPTIONS)
  .exclude(["system"]);

export const OpenAIModelSchema = z.enum(OPENAI_CHAT_MODELS);
export const GeminiModelSchema = z.enum(GeminiTextModels);
export const GrokModelSchema = z.enum(GROK_CHAT_MODELS);

export const ModelSchema = z.union([
  OpenAIModelSchema,
  GeminiModelSchema,
  GrokModelSchema,
]);
export type Model = z.infer<typeof ModelSchema>;

export const ChatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: MessageRoleSchema,
      content: z.string(),
    }),
  ),
  apiKey: z.string().min(1),
  conversationId: z.string(),
  systemPrompt: z.string().optional(),
  model: ModelSchema,
});

export const GetChatMessagesRequestSchema = z.object({
  chatId: z.string(),
});

export const MessageInsertSchema = createInsertSchema(message, {
  role: MessageRoleSchema,
  content: (schema) => schema.min(1, "Message content cannot be empty"),
}).omit({ id: true, createdAt: true });

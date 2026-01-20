import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { GeminiTextAdapter, GeminiTextModels } from "@tanstack/ai-gemini";
import { GROK_CHAT_MODELS, GrokTextAdapter } from "@tanstack/ai-grok";
import { OPENAI_CHAT_MODELS, OpenAITextAdapter } from "@tanstack/ai-openai";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const ChatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["tool", "user", "assistant"]),
      content: z.string(),
    }),
  ),
  apiKey: z.string().min(1),
  conversationId: z.string().optional(),
  systemPrompt: z.string().optional(),
  model: z.string().optional(),
});

function isIcludedIn<T extends readonly string[]>(
  list: T,
  item: string | null | undefined,
): item is T[number] {
  return !!item && list.includes(item);
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = await request.json();
        const { messages, conversationId, systemPrompt, apiKey, model } =
          ChatRequestSchema.parse(json);

        const finalMessages = [
          { role: "system", content: systemPrompt ?? "" },
          ...messages,
        ];

        try {
          if (!model) {
            throw new Error("Model is required");
          }

          let adapter: Parameters<typeof chat>[0]["adapter"];

          if (isIcludedIn(OPENAI_CHAT_MODELS, model)) {
            adapter = new OpenAITextAdapter({ apiKey }, model);
          } else if (isIcludedIn(GeminiTextModels, model)) {
            adapter = new GeminiTextAdapter({ apiKey }, model);
          } else if (isIcludedIn(GROK_CHAT_MODELS, model)) {
            adapter = new GrokTextAdapter({ apiKey }, model);
          } else {
            throw new Error(`Unsupported model: ${model}`);
          }

          const stream = chat({
            adapter,
            messages: finalMessages as any,
            conversationId,
          });

          return toServerSentEventsResponse(stream);
        } catch (error) {
          return new Response(
            JSON.stringify({
              error:
                error instanceof Error ? error.message : "An error occurred",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});

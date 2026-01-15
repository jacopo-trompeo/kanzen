import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { OpenAITextAdapter, openaiText } from "@tanstack/ai-openai";
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
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = await request.json();
        const { messages, conversationId, systemPrompt, apiKey } =
          ChatRequestSchema.parse(json);

        const finalMessages = [
          { role: "system", content: systemPrompt ?? "" },
          ...messages,
        ];

        try {
          const adapter = new OpenAITextAdapter(
            {
              apiKey,
            },
            "gpt-5.2",
          );

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

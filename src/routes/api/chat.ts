import {
  chat,
  type StreamChunk,
  toServerSentEventsResponse,
} from "@tanstack/ai";
import { GeminiTextAdapter } from "@tanstack/ai-gemini";
import { GrokTextAdapter } from "@tanstack/ai-grok";
import { OpenAITextAdapter } from "@tanstack/ai-openai";
import { createFileRoute } from "@tanstack/react-router";
import { saveChatMessage } from "@/domains/ai-chat/functions/chat";
import {
  ChatRequestSchema,
  GeminiModelSchema,
  GrokModelSchema,
  type Model,
  OpenAIModelSchema,
} from "@/domains/ai-chat/types/schemas";
import { isZodEnum } from "@/domains/shared/helpers/zod";

function createAdapter(model: Model, apiKey: string) {
  if (isZodEnum(OpenAIModelSchema, model)) {
    return new OpenAITextAdapter({ apiKey }, model);
  }

  if (isZodEnum(GeminiModelSchema, model)) {
    return new GeminiTextAdapter({ apiKey }, model);
  }

  if (isZodEnum(GrokModelSchema, model)) {
    return new GrokTextAdapter({ apiKey }, model);
  }

  throw new Error(`Unsupported model: ${model}`);
}

function saveResponseToDatabase(
  streamChunk: AsyncIterable<StreamChunk>,
  conversationId: string,
) {
  let responseContent = "";
  const wrappedStream = async function* () {
    try {
      for await (const event of streamChunk) {
        if (event.type === "content") {
          if (!event.content.startsWith(responseContent)) {
            responseContent = event.content;
          } else {
            responseContent += event.content;
          }
        }
        yield event;
      }
    } finally {
      if (responseContent) {
        await saveChatMessage({
          data: {
            chatId: conversationId,
            role: "assistant",
            content: responseContent,
          },
        });
      }
    }
  };

  return wrappedStream();
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = await request.json();
        const { messages, conversationId, systemPrompt, apiKey, model } =
          await ChatRequestSchema.parseAsync(json);

        const userMessage = messages[messages.length - 1];
        await saveChatMessage({
          data: {
            chatId: conversationId,
            role: userMessage.role,
            content: userMessage.content,
          },
        });

        try {
          const adapter = createAdapter(model, apiKey);

          const streamResult = (await chat({
            adapter,
            messages,
            systemPrompts: systemPrompt ? [systemPrompt] : undefined,
            conversationId,
          })) as AsyncIterable<StreamChunk>;

          return toServerSentEventsResponse(
            saveResponseToDatabase(streamResult, conversationId),
          );
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

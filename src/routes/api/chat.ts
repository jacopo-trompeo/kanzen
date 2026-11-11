import {
  chat,
  chatParamsFromRequestBody,
  EventType,
  type ModelMessage,
  type StreamChunk,
  toServerSentEventsResponse,
  type UIMessage,
} from "@tanstack/ai";
import { GeminiTextAdapter } from "@tanstack/ai-gemini";
import { GrokTextAdapter } from "@tanstack/ai-grok";
import { OpenAITextAdapter } from "@tanstack/ai-openai";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import { saveChatMessage } from "@/domains/ai-chat/functions/message";
import {
  type ChatForwardedProps,
  ChatForwardedPropsSchema,
  GeminiModelSchema,
  GrokModelSchema,
  type Model,
  OpenAIModelSchema,
} from "@/domains/ai-chat/types/schemas";
import { isZodEnum } from "@/domains/shared/helpers/zod";

type WireMessage = UIMessage | ModelMessage;

type ParsedChatRequest =
  | {
      ok: true;
      messages: Array<WireMessage>;
      threadId: string;
      userText: string;
      props: ChatForwardedProps;
    }
  | { ok: false; error: string };

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

function textOf(message: WireMessage): string {
  if ("parts" in message) {
    return message.parts
      .flatMap((part) => (part.type === "text" ? [part.content] : []))
      .join("");
  }

  if (message.content === null) {
    return "";
  }

  if (typeof message.content === "string") {
    return message.content;
  }

  return message.content
    .flatMap((part) => (part.type === "text" ? [part.content] : []))
    .join("");
}

async function parseChatRequest(body: unknown): Promise<ParsedChatRequest> {
  let params: Awaited<ReturnType<typeof chatParamsFromRequestBody>>;
  try {
    params = await chatParamsFromRequestBody(body);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid chat request",
    };
  }

  const props = ChatForwardedPropsSchema.safeParse(params.forwardedProps);
  if (!props.success) {
    return { ok: false, error: z.prettifyError(props.error) };
  }

  const lastMessage = params.messages.at(-1);
  if (lastMessage?.role !== "user") {
    return { ok: false, error: "The last message must be a user message" };
  }

  const userText = textOf(lastMessage);
  if (!userText) {
    return { ok: false, error: "The user message has no text content" };
  }

  return {
    ok: true,
    messages: params.messages,
    threadId: params.threadId,
    userText,
    props: props.data,
  };
}

async function* persistAssistantReply(
  stream: AsyncIterable<StreamChunk>,
  chatId: string,
) {
  let reply = "";
  try {
    for await (const chunk of stream) {
      if (chunk.type === EventType.TEXT_MESSAGE_CONTENT) {
        reply += chunk.delta;
      }
      if (chunk.type === EventType.RUN_ERROR) {
        console.error("[api/chat] provider run error", {
          chatId,
          code: chunk.code,
          message: chunk.message,
        });
      }
      yield chunk;
    }
  } finally {
    if (reply) {
      await saveChatMessage({
        data: { chatId, role: "assistant", content: reply },
      });
    }
  }
}

function jsonError(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return jsonError(400, "Request body must be valid JSON");
        }

        const parsed = await parseChatRequest(body);
        if (!parsed.ok) {
          return jsonError(400, parsed.error);
        }

        const { messages, threadId, userText, props } = parsed;

        await saveChatMessage({
          data: { chatId: threadId, role: "user", content: userText },
        });

        const abortController = new AbortController();
        const stream = chat({
          adapter: createAdapter(props.model, props.apiKey),
          messages,
          threadId,
          systemPrompts: props.systemPrompt ? [props.systemPrompt] : undefined,
          abortController,
        });

        return toServerSentEventsResponse(
          persistAssistantReply(stream, threadId),
          { abortController },
        );
      },
    },
  },
});

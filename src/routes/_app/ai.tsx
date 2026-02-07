import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import { ChatProvider } from "@/domains/ai-chat/context/chat";
import { getChatMessages } from "@/domains/ai-chat/functions/chat";
import { Chat } from "@/domains/ai-chat/ui/chat";

const AISearchSchema = z.object({
  conversationId: z.string().optional(),
});

export const Route = createFileRoute("/_app/ai")({
  component: AIPage,
  validateSearch: (search) => AISearchSchema.parse(search),
  loaderDeps: (deps) => deps.search,
  loader: async ({ deps }) => {
    const { conversationId } = deps;

    if (!conversationId) {
      return { initialMessages: [], conversationId: "" };
    }

    const initialMessages = await getChatMessages({
      data: { chatId: conversationId },
    });

    return { initialMessages, conversationId };
  },
});

function AIPage() {
  const { initialMessages, conversationId } = Route.useLoaderData();

  return (
    <ChatProvider
      initialMessages={initialMessages}
      conversationId={conversationId}
    >
      <Chat />
    </ChatProvider>
  );
}

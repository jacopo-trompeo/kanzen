import { createFileRoute } from "@tanstack/react-router";
import { ChatProvider } from "@/domains/ai-chat/context/chat";
import { getChatMessages } from "@/domains/ai-chat/functions/chat";
import { AISearchSchema } from "@/domains/ai-chat/types/schemas";
import { Chat } from "@/domains/ai-chat/ui/chat";

export const Route = createFileRoute("/_app/ai")({
  component: AIPage,
  validateSearch: (search) => AISearchSchema.parse(search),
  loaderDeps: (deps) => deps.search,
  loader: async ({ deps }) => {
    const { conversationId } = deps;

    if (!conversationId) {
      return { initialMessages: [], conversationId: crypto.randomUUID() };
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
      key={conversationId}
      initialMessages={initialMessages}
      conversationId={conversationId}
    >
      <Chat />
    </ChatProvider>
  );
}

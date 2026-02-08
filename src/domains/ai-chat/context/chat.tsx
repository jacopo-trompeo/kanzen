import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { createContext, type PropsWithChildren, useContext } from "react";
import { useAiChatSettings } from "@/domains/ai-chat/hooks/use-ai-chat-settings";
import type { Message } from "@/domains/ai-chat/types";

const ChatContext = createContext<
  (ReturnType<typeof useChat> & { conversationId: string }) | null
>(null);

interface ChatContextValue {
  initialMessages: Message[];
  conversationId: string;
}

export function ChatProvider(props: PropsWithChildren<ChatContextValue>) {
  const { children, initialMessages, conversationId } = props;
  const { settings } = useAiChatSettings();

  const chat = useChat({
    initialMessages: initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      parts: [{ type: "text", content: m.content }],
    })),
    connection: fetchServerSentEvents("api/chat", {
      body: {
        apiKey: settings?.apiKey,
        systemPrompt: settings?.systemPrompt,
        model: settings?.model,
        conversationId,
      },
    }),
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  return (
    <ChatContext.Provider value={{ ...chat, conversationId }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}

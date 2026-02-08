import { useQuery } from "@tanstack/react-query";
import { getChatFirstUserMessage } from "@/domains/ai-chat/functions/chat";
import type { Chat } from "@/domains/ai-chat/types";

export function useChatTitle(chat: Chat): string {
  const { data: firstMessage } = useQuery({
    queryKey: ["chat-first-message", chat.id],
    queryFn: () => getChatFirstUserMessage({ data: { chatId: chat.id } }),
    enabled: !chat.title,
    staleTime: 60000,
  });

  if (chat.title) {
    return chat.title;
  }

  if (!firstMessage) {
    return "Untitled Chat";
  }

  const content = firstMessage.content;
  return content.length > 50 ? `${content.slice(0, 50)}...` : content;
}

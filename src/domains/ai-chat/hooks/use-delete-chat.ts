import type { InfiniteData } from "@tanstack/react-query";
import { deleteChat } from "@/domains/ai-chat/functions/chat";
import type { ChatsPageData } from "@/domains/ai-chat/types";
import { useOptimisticUpdate } from "@/domains/shared/hooks/use-optimistic-update";

const QUERY_KEY = ["user-chats"];

export function useDeleteChat() {
  return useOptimisticUpdate<InfiniteData<ChatsPageData>, string, void>({
    queryKey: QUERY_KEY,
    mutationFn: (chatId: string) => deleteChat({ data: { chatId } }),
    updater: (oldData, chatId) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          chats: page.chats.filter((chat) => chat.id !== chatId),
        })),
      };
    },
  });
}

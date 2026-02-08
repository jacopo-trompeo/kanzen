import type { InfiniteData } from "@tanstack/react-query";
import { updateChatTitle } from "@/domains/ai-chat/functions/chat";
import type {
  ChatsPageData,
  UpdateChatTitleParams,
} from "@/domains/ai-chat/types";
import { useOptimisticUpdate } from "@/domains/shared/hooks/use-optimistic-update";

const QUERY_KEY = ["user-chats"];

export function useRenameChat() {
  return useOptimisticUpdate<
    InfiniteData<ChatsPageData>,
    UpdateChatTitleParams,
    void
  >({
    queryKey: QUERY_KEY,
    mutationFn: ({ chatId, title }) => {
      return updateChatTitle({ data: { chatId, title } });
    },
    updater: (oldData, { chatId, title }) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          chats: page.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat,
          ),
        })),
      };
    },
  });
}

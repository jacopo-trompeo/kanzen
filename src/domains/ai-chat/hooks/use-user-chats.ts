import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserChats } from "@/domains/ai-chat/functions/chat";
import { USER_CHATS_KEY } from "@/domains/ai-chat/lib/query-keys";

export function useUserChats() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [USER_CHATS_KEY],
      queryFn: ({ pageParam }) => {
        return getUserChats({ data: { limit: 5, offset: pageParam } });
      },
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.hasMore) return undefined;
        return allPages.reduce((acc, page) => acc + page.chats.length, 0);
      },
      initialPageParam: 0,
      staleTime: Number.POSITIVE_INFINITY,
    });

  const chats = data?.pages.flatMap((page) => page.chats) ?? [];

  return {
    chats,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}

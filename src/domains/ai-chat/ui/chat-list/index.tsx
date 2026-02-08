import { useUserChats } from "@/domains/ai-chat/hooks/use-user-chats";
import { SidebarMenuSub } from "@/domains/shared/components/ui/sidebar";
import { ChatItem } from "./chat-item";
import { EmptyState } from "./empty-state";
import { LoadingState } from "./loading-state";
import { NewChatButton } from "./new-chat-button";
import { PaginationSentinel } from "./pagination-sentinel";

export function ChatListSubmenu() {
  const { chats, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useUserChats();

  if (isLoading) {
    return <LoadingState />;
  }

  if (chats.length === 0) {
    return <EmptyState />;
  }

  return (
    <SidebarMenuSub className="mr-2 max-h-[250px] overflow-y-scroll">
      <NewChatButton />
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
      <PaginationSentinel
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </SidebarMenuSub>
  );
}

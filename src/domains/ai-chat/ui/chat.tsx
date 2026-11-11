import { useChatContext } from "@/domains/ai-chat/context/chat";
import { useAutoscroll } from "@/domains/shared/hooks/use-autoscroll";
import { ChatEmptyState } from "./chat-empty-state";
import { ChatMessageList } from "./chat-message-list";
import { UserMessageInput } from "./user-message-input";

export function Chat() {
  const { messages } = useChatContext();
  const { scrollContainerRef, scrollToBottom } = useAutoscroll({
    stickyScrollThreshold: 100,
  });

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen w-full flex-col">
      {hasMessages ? (
        <>
          <ChatMessageList scrollContainerRef={scrollContainerRef} />
          <div className="bg-background border-t py-4">
            <UserMessageInput onSubmit={scrollToBottom} />
          </div>
        </>
      ) : (
        <ChatEmptyState onSubmit={scrollToBottom} />
      )}
    </div>
  );
}

import { useChatContext } from "@/domains/ai-chat/context/chat";
import { Message } from "@/domains/ai-chat/ui/message";

interface ChatMessageListProps {
  scrollContainerRef: (node: HTMLElement | null) => void;
}

export function ChatMessageList(props: ChatMessageListProps) {
  const { scrollContainerRef } = props;
  const { messages } = useChatContext();

  const lastAssistantMessage = messages.findLast(
    (message) => message.role === "assistant",
  );

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 scrollbar-gutter-stable overflow-y-auto"
    >
      <div className="mx-auto flex w-4xl flex-col gap-5 py-8">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isLastAssistantMessage={lastAssistantMessage?.id === message.id}
          />
        ))}
      </div>
    </div>
  );
}

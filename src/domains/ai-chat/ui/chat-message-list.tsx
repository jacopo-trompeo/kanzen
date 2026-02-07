import type { UIMessage } from "@tanstack/ai";
import { Message } from "./message";

interface ChatMessageListProps {
  messages: UIMessage[];
  scrollContainerRef: (node: HTMLElement | null) => void;
}

export function ChatMessageList(props: ChatMessageListProps) {
  const { messages, scrollContainerRef } = props;

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto [scrollbar-gutter:stable]"
    >
      <div className="mx-auto flex w-4xl flex-col gap-5 py-8">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            className={
              message.role === "user" ? "justify-end" : "justify-start"
            }
          />
        ))}
      </div>
    </div>
  );
}

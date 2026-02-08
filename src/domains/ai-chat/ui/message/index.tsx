/** biome-ignore-all lint/suspicious/noArrayIndexKey: best practice following library specifications */

import type { UIMessage } from "@tanstack/ai";
import { cn } from "@/domains/shared/lib/utils";
import { MessageActions } from "./message-actions";
import { TextPart } from "./text-part";
import { ThinkingPart } from "./thinking-part";

interface MessageProps {
  message: UIMessage;
  isLastAssistantMessage: boolean;
}

export function Message(props: MessageProps) {
  const { message, isLastAssistantMessage } = props;
  const isFromUser = message.role === "user";

  return (
    <div
      className={cn(
        "group flex w-full justify-start gap-2",
        isFromUser ? "flex-row-reverse" : "flex-col items-start",
      )}
    >
      <div
        className={cn(
          "flex max-w-[85%] flex-col gap-y-2 rounded-xl px-4 py-3",
          isFromUser && "bg-primary text-primary-foreground",
        )}
      >
        {message.parts.map((part, idx) => {
          switch (part.type) {
            case "thinking":
              return <ThinkingPart key={idx} content={part.content} />;
            case "text":
              return (
                <TextPart
                  key={idx}
                  content={part.content}
                  isFromUser={isFromUser}
                />
              );
            default:
              return null;
          }
        })}
      </div>
      <MessageActions
        isFromUser={isFromUser}
        messageParts={message.parts}
        isLastAssistantMessage={isLastAssistantMessage}
      />
    </div>
  );
}

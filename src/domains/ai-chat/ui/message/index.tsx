/** biome-ignore-all lint/suspicious/noArrayIndexKey: best practice following library specifications */

import type { UIMessage } from "@tanstack/ai";
import { cn } from "@/domains/shared/lib/utils";
import { TextPart } from "./text-part";
import { ThinkingPart } from "./thinking-part";

interface MessageProps extends Pick<React.ComponentProps<"div">, "className"> {
  message: UIMessage;
}

export function Message(props: MessageProps) {
  const { message, className } = props;
  const isFromUser = message.role === "user";

  return (
    <div className={cn("flex w-full", className)}>
      <div
        className={cn(
          "flex max-w-[85%] flex-col gap-y-2 rounded-xl p-4 py-3",
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
    </div>
  );
}

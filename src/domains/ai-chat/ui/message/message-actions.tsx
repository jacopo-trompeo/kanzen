import type { MessagePart } from "@tanstack/ai";
import { useChatContext } from "@/domains/ai-chat/context/chat";
import { CopyMessageButton } from "@/domains/ai-chat/ui/copy-message-button";
import { ReloadMessageButton } from "../reload-message-button";

interface MessageActionsProps {
  isFromUser: boolean;
  messageParts: MessagePart[];
  isLastAssistantMessage: boolean;
}

export function MessageActions(props: MessageActionsProps) {
  const { isFromUser, messageParts, isLastAssistantMessage } = props;
  const { isLoading } = useChatContext();

  const textContent = messageParts
    .map((part) => (part.type === "text" ? part.content : null))
    .filter((content) => content !== null)
    .join("");

  if (isFromUser) {
    return (
      <CopyMessageButton
        className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        text={textContent}
      />
    );
  }

  if (isLoading || !isLastAssistantMessage) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <ReloadMessageButton />
      <CopyMessageButton text={textContent} />
    </div>
  );
}

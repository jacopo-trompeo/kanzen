import { useEffect, useRef } from "react";
import { useChatRenameForm } from "@/domains/ai-chat/hooks/use-chat-rename-form";
import type { Chat } from "@/domains/ai-chat/types";
import { TextField } from "@/domains/shared/components/form/text-field";

interface ChatItemRenameProps {
  chat: Chat;
  onComplete: () => void;
}

export function ChatItemRename({ chat, onComplete }: ChatItemRenameProps) {
  const form = useChatRenameForm(chat, onComplete);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      onComplete();
    } else if (e.key === "Enter") {
      e.preventDefault();
      form.handleSubmit();
    }
  }

  return (
    <div className="px-2 py-1">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="title"
          children={() => (
            <TextField
              ref={inputRef}
              onBlur={() => form.handleSubmit()}
              onKeyDown={handleKeyDown}
              className="h-7 text-sm"
            />
          )}
        />
      </form>
    </div>
  );
}

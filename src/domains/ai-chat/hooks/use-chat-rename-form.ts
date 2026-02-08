import { useRenameChat } from "@/domains/ai-chat/hooks/use-rename-chat";
import type { Chat } from "@/domains/ai-chat/types";
import { useAppForm } from "@/domains/shared/hooks/form";

type ChatRenameFields = {
  title: string;
};

interface ChatRenameFormOptions {
  onComplete: () => void;
}

export function useChatRenameForm(chat: Chat, options: ChatRenameFormOptions) {
  const { onComplete } = options;
  const { mutate: renameChat } = useRenameChat();

  const defaultValues: ChatRenameFields = {
    title: chat.title || "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const trimmedValue = value.title.trim();
      if (trimmedValue && trimmedValue !== chat.title) {
        renameChat(
          { chatId: chat.id, title: trimmedValue },
          {
            onSuccess: () => {
              onComplete();
            },
          },
        );
      } else {
        onComplete();
      }
    },
  });

  return form;
}

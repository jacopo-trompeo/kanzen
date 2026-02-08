import { useQueryClient } from "@tanstack/react-query";
import { useChatContext } from "@/domains/ai-chat/context/chat";
import { useAppForm } from "@/domains/shared/hooks/form";

type UserInputFields = {
  message: string;
};

interface UseUserInputFormOptions {
  isFirstMessage?: boolean;
}

export function useUserInputForm(options: UseUserInputFormOptions) {
  const { isFirstMessage = false } = options;
  const { sendMessage, isLoading } = useChatContext();
  const queryClient = useQueryClient();

  const defaultValues: UserInputFields = {
    message: "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (value.message.trim() && !isLoading) {
        await sendMessage(value.message.trim());
        if (isFirstMessage) {
          queryClient.invalidateQueries({ queryKey: ["user-chats"] });
        }
      }
    },
  });

  return form;
}

import { useQueryClient } from "@tanstack/react-query";
import { useChatContext } from "@/domains/ai-chat/context/chat";
import { USER_CHATS_KEY } from "@/domains/ai-chat/lib/query-keys";
import { useAppForm } from "@/domains/shared/hooks/form";

type UserInputFields = {
  message: string;
};

export function useUserInputForm() {
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
        queryClient.invalidateQueries({ queryKey: [USER_CHATS_KEY] });
      }
    },
  });

  return form;
}

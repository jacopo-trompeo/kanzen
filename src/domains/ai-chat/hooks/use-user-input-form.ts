import { useChatContext } from "@/domains/ai-chat/context/chat";
import { useAppForm } from "@/domains/shared/hooks/form";

type UserInputFields = {
  message: string;
};

export function useUserInputForm() {
  const { sendMessage, isLoading } = useChatContext();

  const defaultValues: UserInputFields = {
    message: "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (value.message.trim() && !isLoading) {
        sendMessage(value.message.trim());
      }
    },
  });

  return form;
}

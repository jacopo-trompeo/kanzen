import { useAiChatSettings } from "@/domains/ai-chat/hooks/use-ai-chat-settings";
import { useAppForm } from "@/domains/shared/hooks/form";

type ChatSettingsFields = {
  apiKey: string;
  model: string;
  systemPrompt: string;
};

export function useChatSettingsForm() {
  const { settings, updateSettings } = useAiChatSettings();

  const defaultValues: ChatSettingsFields = {
    apiKey: settings?.apiKey || "",
    model: settings?.model || "",
    systemPrompt: settings?.systemPrompt || "",
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await updateSettings.mutateAsync(value);
    },
  });

  return form;
}

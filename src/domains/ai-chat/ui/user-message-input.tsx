import { useNavigate } from "@tanstack/react-router";
import { Send, StopCircle } from "lucide-react";
import { useChatContext } from "@/domains/ai-chat/context/chat";
import { useUserInputForm } from "@/domains/ai-chat/hooks/use-user-input-form";
import { SubscribeButton } from "@/domains/shared/components/form/subscribe-button";
import { TextField } from "@/domains/shared/components/form/text-field";
import { Button } from "@/domains/shared/components/ui/button";
import { Route } from "@/routes/_app/ai";
import { ChatSettings } from "./chat-settings";

interface UserMessageInputProps {
  onSubmit: () => void;
}

export function UserMessageInput(props: UserMessageInputProps) {
  const { onSubmit } = props;
  const { isLoading, conversationId } = useChatContext();
  const form = useUserInputForm();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit().then(() => {
          form.reset({ message: "" });
          if (!Route.fullPath.includes("conversationId")) {
            navigate({
              to: Route.fullPath,
              search: { conversationId },
              replace: true,
            });
          }
          setTimeout(() => {
            onSubmit();
          }, 0);
        });
      }}
      className="mx-auto flex w-full max-w-4xl gap-3 px-4"
    >
      <form.AppField
        name="message"
        children={() => (
          <>
            <TextField
              type="text"
              placeholder={
                isLoading ? "Generating explaination..." : "Ask a question!"
              }
              disabled={isLoading}
            />
          </>
        )}
      />

      <ChatSettings />

      {isLoading ? (
        <Button type="button" variant="destructive" onClick={stop}>
          <StopCircle className="mr-2 h-4 w-4" /> Stop
        </Button>
      ) : (
        <form.AppForm>
          <SubscribeButton>
            <Send className="h-4 w-4" />
          </SubscribeButton>
        </form.AppForm>
      )}
    </form>
  );
}

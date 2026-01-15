import { createFileRoute } from "@tanstack/react-router";
import { Chat } from "@/domains/ai-chat/ui/chat";

export const Route = createFileRoute("/_app/ai")({
  component: AIPage,
});

function AIPage() {
  return <Chat />;
}

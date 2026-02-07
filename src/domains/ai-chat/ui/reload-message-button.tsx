import { RotateCw } from "lucide-react";
import { useChatContext } from "@/domains/ai-chat/context/chat";
import { Button } from "@/domains/shared/components/ui/button";

export function ReloadMessageButton() {
  const { reload } = useChatContext();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Reload message"
      onClick={reload}
    >
      <RotateCw />
    </Button>
  );
}

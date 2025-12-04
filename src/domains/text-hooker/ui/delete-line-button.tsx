import { X } from "lucide-react";
import { Button } from "@/domains/shared/components/ui/button";
import { deleteLineFromClipboardStore } from "@/domains/text-hooker/stores/clipboard";

interface DeleteLineButtonProps {
  lineId: string | undefined;
}

export function DeleteLineButton(props: DeleteLineButtonProps) {
  const { lineId } = props;

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className="hover:bg-transparent"
      onClick={() => {
        if (!lineId) return;
        deleteLineFromClipboardStore(lineId);
      }}
    >
      <X />
    </Button>
  );
}

import { X } from "lucide-react";
import { Button } from "@/domains/shared/components/ui/button";
import { deleteLine } from "@/domains/text-hooker/stores/db";

interface DeleteLineButtonProps {
  lineId: number | undefined;
}

export function DeleteLineButton(props: DeleteLineButtonProps) {
  const { lineId } = props;

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className="hover:bg-transparent"
      onClick={async () => {
        if (!lineId) return;
        await deleteLine(lineId);
      }}
    >
      <X />
    </Button>
  );
}

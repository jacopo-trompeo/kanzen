import { X } from "lucide-react";
import { Button } from "@/domains/shared/components/ui/button";
import { deleteLogEntry } from "@/domains/text-hooker/functions/text-log-db";

interface DeleteEntryButtonProps {
  entryId: number;
}

export function DeleteEntryButton(props: DeleteEntryButtonProps) {
  const { entryId } = props;

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className="hover:bg-transparent"
      onClick={() => deleteLogEntry(entryId)}
    >
      <X />
    </Button>
  );
}

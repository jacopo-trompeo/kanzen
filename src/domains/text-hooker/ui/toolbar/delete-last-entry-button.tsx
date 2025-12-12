import { Undo } from "lucide-react";
import { deleteLastEntry } from "@/domains/text-hooker/functions/text-log-db";
import { ToolbarButton } from "./toolbar-button";

export function DeleteLastEntryButton() {
  return (
    <ToolbarButton onClick={() => deleteLastEntry()}>
      <Undo />
    </ToolbarButton>
  );
}

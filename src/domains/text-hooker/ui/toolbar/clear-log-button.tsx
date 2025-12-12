import { X } from "lucide-react";
import { clearLogEntries } from "@/domains/text-hooker/functions/text-log-db";
import { ToolbarButton } from "./toolbar-button";

export function ClearLogButton() {
  return (
    <ToolbarButton onClick={() => clearLogEntries()}>
      <X />
    </ToolbarButton>
  );
}

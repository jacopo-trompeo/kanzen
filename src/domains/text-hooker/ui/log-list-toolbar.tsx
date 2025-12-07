import { useStore } from "@tanstack/react-store";
import { debounce } from "lodash";
import { X } from "lucide-react";
import { Button } from "@/domains/shared/components/ui/button";
import { Input } from "@/domains/shared/components/ui/input";
import { cn } from "@/domains/shared/lib/utils";
import { updateTextHookerSettings } from "@/domains/text-hooker/functions/update-text-hooker-settings";
import { clearLogEntries } from "@/domains/text-hooker/lib/db";
import {
  textHookerSettingsStore,
  updateTextHookerStoreSettings,
} from "@/domains/text-hooker/stores/settings";

interface LogListToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LogListToolbar(props: LogListToolbarProps) {
  const { className, ...rest } = props;
  const { fontSize } = useStore(textHookerSettingsStore);

  function handleFontSizeChange(fontSize: number) {
    updateTextHookerStoreSettings({
      fontSize,
    });
    debouncedFontSizeChange(fontSize);
  }

  const debouncedFontSizeChange = debounce(async (fontSize: number) => {
    // INFO: se aggiorno la pagina prima dei 500ms il database non viene aggiornato
    await updateTextHookerSettings({
      data: {
        fontSize,
      },
    });
  }, 500);

  return (
    <div
      {...rest}
      className={cn(
        "flex items-center gap-5 rounded bg-slate-200 px-10 py-5",
        className,
      )}
    >
      <Button
        size="icon-xs"
        variant="ghost"
        className="hover:bg-transparent"
        onClick={() => clearLogEntries()}
      >
        <X />
      </Button>
      <Input
        type="number"
        value={fontSize}
        onChange={(e) => handleFontSizeChange(+e.target.value)}
      />
    </div>
  );
}

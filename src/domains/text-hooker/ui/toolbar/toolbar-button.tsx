import { Button } from "@/domains/shared/components/ui/button";
import { cn } from "@/domains/shared/lib/utils";

interface ToolbarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function ToolbarButton(props: ToolbarButtonProps) {
  const { onClick, children, className, ...rest } = props;

  return (
    <Button
      size="icon-xs"
      variant="ghost"
      className={cn("hover:bg-transparent", className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
}

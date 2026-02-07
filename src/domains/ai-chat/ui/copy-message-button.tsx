import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/domains/shared/components/ui/button";

interface CopyMessageButtonProps
  extends Pick<React.ComponentProps<typeof Button>, "className"> {
  text: string;
}

export function CopyMessageButton(props: CopyMessageButtonProps) {
  const { text, ...rest } = props;
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Copy message"
      onClick={handleCopy}
      {...rest}
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}

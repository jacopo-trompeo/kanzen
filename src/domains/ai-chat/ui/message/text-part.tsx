import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/domains/shared/lib/utils";

interface TextPartProps {
  content: string;
  isFromUser: boolean;
}

export function TextPart(props: TextPartProps) {
  const { content, isFromUser } = props;

  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert wrap-break-words max-w-none",
        isFromUser && "text-primary-foreground",
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

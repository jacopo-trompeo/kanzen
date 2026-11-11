interface ThinkingPartProps {
  content: string;
}

export function ThinkingPart(props: ThinkingPartProps) {
  const { content } = props;

  return (
    <div className="border-primary text-muted-foreground/80 border-l-2 pl-2 text-xs italic">
      <span className="text-primary/80 text-xs font-semibold tracking-wider uppercase">
        Thinking...
      </span>
      <p>{content}</p>
    </div>
  );
}

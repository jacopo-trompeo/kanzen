interface ThinkingPartProps {
  content: string;
}

export function ThinkingPart(props: ThinkingPartProps) {
  const { content } = props;

  return (
    <div className="border-primary border-l-2 pl-2 text-muted-foreground/80 text-xs italic">
      <span className="font-semibold text-primary/80 text-xs uppercase tracking-wider">
        Thinking...
      </span>
      <p>{content}</p>
    </div>
  );
}

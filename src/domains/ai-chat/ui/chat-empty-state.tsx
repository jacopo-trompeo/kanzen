import { UserMessageInput } from "./user-message-input";

interface ChatEmptyStateProps {
  onSubmit: () => void;
}

export function ChatEmptyState(props: ChatEmptyStateProps) {
  const { onSubmit } = props;

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-4xl">
        <UserMessageInput onSubmit={onSubmit} />
      </div>
    </div>
  );
}

import { Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useChatTitle } from "@/domains/ai-chat/hooks/use-chat-title";
import type { Chat } from "@/domains/ai-chat/types";
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/domains/shared/components/ui/sidebar";
import { Route } from "@/routes/_app/ai";
import { ChatItemActions } from "./chat-item-actions";
import { ChatItemRename } from "./chat-item-rename";

interface ChatItemProps {
  chat: Chat;
}

export function ChatItem(props: ChatItemProps) {
  const { chat } = props;
  const [isRenaming, setIsRenaming] = useState(false);
  const { conversationId } =
    useSearch({ from: Route.id, shouldThrow: false }) ?? {};
  const title = useChatTitle(chat);
  const isActive = conversationId === chat.id;

  if (isRenaming) {
    return (
      <SidebarMenuSubItem>
        <ChatItemRename chat={chat} onComplete={() => setIsRenaming(false)} />
      </SidebarMenuSubItem>
    );
  }

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={isActive}>
        <Link to={`/ai?conversationId=${chat.id}`}>
          <span className="text-muted-foreground">{title}</span>
        </Link>
      </SidebarMenuSubButton>
      <ChatItemActions
        chat={chat}
        conversationId={conversationId}
        onRename={() => setIsRenaming(true)}
      />
    </SidebarMenuSubItem>
  );
}

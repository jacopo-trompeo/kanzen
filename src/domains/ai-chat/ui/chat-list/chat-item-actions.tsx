import { useNavigate } from "@tanstack/react-router";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteChat } from "@/domains/ai-chat/hooks/use-delete-chat";
import type { Chat } from "@/domains/ai-chat/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/domains/shared/components/ui/dropdown-menu";
import {
  SidebarMenuAction,
  useSidebar,
} from "@/domains/shared/components/ui/sidebar";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";

interface ChatItemActionsProps {
  chat: Chat;
  conversationId: string | undefined;
  onRename: () => void;
}

export function ChatItemActions(props: ChatItemActionsProps) {
  const { chat, conversationId, onRename } = props;
  const { mutate: deleteChat } = useDeleteChat();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  function handleDelete() {
    const shouldRedirect = conversationId === chat.id;
    deleteChat(chat.id);

    if (shouldRedirect) {
      navigate({ to: "/ai", replace: true });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreVertical />
            <span className="sr-only">Actions</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "start" : "end"}
        >
          <DropdownMenuItem onClick={onRename}>
            <Pencil className="text-muted-foreground" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="text-muted-foreground" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleDelete}
      />
    </>
  );
}

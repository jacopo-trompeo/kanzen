import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/domains/shared/components/ui/sidebar";

export function NewChatButton() {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link to="/ai" className="text-sidebar-foreground/90">
          <Plus className="size-3!" />
          <span>New Chat</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

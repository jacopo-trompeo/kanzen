import { Loader2 } from "lucide-react";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/domains/shared/components/ui/sidebar";

export function LoadingState() {
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton>
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sidebar-foreground/50">Loading chats...</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );
}

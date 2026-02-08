import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BookOpenText,
  BrainCircuit,
  ChevronDown,
  Clapperboard,
  ClipboardList,
  Languages,
  LogOut,
  Settings,
  TextAlignStart,
} from "lucide-react";
import { ChatListSubmenu } from "@/domains/ai-chat/ui/chat-list";
import { authClient } from "@/domains/auth/lib/client";
import type { SidebarItem } from "@/domains/shared/types/sidebar";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const items: SidebarItem[] = [
  {
    type: "link",
    title: "Dictionary",
    url: "/",
    icon: Languages,
  },
  {
    type: "link",
    title: "Grammar",
    url: "/grammar",
    icon: TextAlignStart,
  },
  {
    type: "link",
    title: "Epub Reader",
    url: "/reader",
    icon: BookOpenText,
  },
  {
    type: "link",
    title: "Video Player",
    url: "/video-player",
    icon: Clapperboard,
  },
  {
    type: "link",
    title: "Text Hooker",
    url: "/text-hooker",
    icon: ClipboardList,
  },
  {
    type: "collapsible",
    title: "AI Assistant",
    url: "/ai",
    icon: BrainCircuit,
    submenu: ChatListSubmenu,
  },
  {
    type: "link",
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.type === "link") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <li key={item.title}>
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild className="cursor-pointer">
                        <SidebarMenuButton isActive={pathname === item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <item.submenu />
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                onClick={() => {
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        navigate({
                          to: "/sign-in",
                        });
                      },
                    },
                  });
                }}
              >
                <LogOut />
                <span>Sign out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

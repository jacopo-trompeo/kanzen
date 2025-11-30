import {
  Link,
  type LinkOptions,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import {
  BookOpenText,
  BrainCircuit,
  Clapperboard,
  ClipboardList,
  Languages,
  LogOut,
  Settings,
  TextAlignStart,
} from "lucide-react";
import type { ComponentType } from "react";
import { authClient } from "@/domains/auth/lib/client";
import { Button } from "./ui/button";
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

type SidebarItem = {
  title: string;
  url: LinkOptions["to"];
  icon: ComponentType;
};

const items: SidebarItem[] = [
  {
    title: "Dictionary",
    url: "/",
    icon: Languages,
  },
  {
    title: "Grammar",
    url: "/grammar",
    icon: TextAlignStart,
  },
  {
    title: "Epub Reader",
    url: "/reader",
    icon: BookOpenText,
  },
  {
    title: "Video Player",
    url: "/video-player",
    icon: Clapperboard,
  },
  {
    title: "Text Hooker",
    url: "/text-hooker",
    icon: ClipboardList,
  },
  {
    title: "AI Assistant",
    url: "/ai",
    icon: BrainCircuit,
  },
  {
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
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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

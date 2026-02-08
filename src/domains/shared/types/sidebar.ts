import type { LinkOptions } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SimpleSidebarItem = {
  type: "link";
  title: string;
  url: LinkOptions["to"];
  icon: LucideIcon;
};

type CollapsibleSidebarItem = {
  type: "collapsible";
  title: string;
  url: LinkOptions["to"];
  icon: LucideIcon;
  submenu: () => ReactNode;
};

export type SidebarItem = SimpleSidebarItem | CollapsibleSidebarItem;

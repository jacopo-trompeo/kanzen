import { Loader2 } from "lucide-react";
import { useInfiniteScroll } from "@/domains/ai-chat/hooks/use-infinite-scroll";
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/domains/shared/components/ui/sidebar";

interface PaginationSentinelProps {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
}

export function PaginationSentinel(props: PaginationSentinelProps) {
  const { hasNextPage, isFetching, onLoadMore } = props;
  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetching,
    onLoadMore,
  });

  if (!hasNextPage) return null;

  return (
    <SidebarMenuSubItem ref={sentinelRef}>
      <SidebarMenuSubButton>
        {isFetching && (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span className="text-sidebar-foreground/50">Loading...</span>
          </>
        )}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

import { Loader2 } from "lucide-react";
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/domains/shared/components/ui/sidebar";
import { useInfiniteScroll } from "@/domains/shared/hooks/use-infinite-scroll";

interface PaginationSentinelProps {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
}

export function PaginationSentinel(props: PaginationSentinelProps) {
  const { hasNextPage, isFetching, onLoadMore } = props;
  const sentinelRef = useInfiniteScroll<HTMLLIElement>({
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

import { useEffect, useLayoutEffect, useRef } from "react";

export const STICKY_SCROLL_THRESHOLD = 300;
export const AT_BOTTOM_TOLERANCE = 1;

interface UseAutoscrollOptions {
  onAtBottom?: () => void;
  stickyScrollThreshold?: number;
}

export function useAutoscroll(
  content: unknown[],
  options: UseAutoscrollOptions = {},
) {
  const { onAtBottom, stickyScrollThreshold = STICKY_SCROLL_THRESHOLD } =
    options;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousContentLengthRef = useRef(content.length);
  const isNearBottomRef = useRef(true);
  const onAtBottomRef = useRef(onAtBottom);

  useLayoutEffect(() => {
    onAtBottomRef.current = onAtBottom;
  }, [onAtBottom]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      isNearBottomRef.current = distanceToBottom <= stickyScrollThreshold;

      if (distanceToBottom < AT_BOTTOM_TOLERANCE) {
        onAtBottomRef.current?.();
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [stickyScrollThreshold]);

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const wasNewContentAdded =
      content.length > previousContentLengthRef.current;

    if (wasNewContentAdded && isNearBottomRef.current) {
      container.scrollTop = container.scrollHeight;
    }

    previousContentLengthRef.current = content.length;
  }, [content.length]);

  return scrollContainerRef;
}

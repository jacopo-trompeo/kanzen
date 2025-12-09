import { useEffect, useLayoutEffect, useRef } from "react";

export const STICKY_SCROLL_THRESHOLD = 300;
export const AT_BOTTOM_TOLERANCE = 1;

interface UseAutoscrollOptions {
  content: unknown[];
  onAtBottom?: () => void;
}

export function useAutoscroll(options: UseAutoscrollOptions) {
  const { content, onAtBottom } = options;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousContentLengthRef = useRef(content.length);
  const isNearBottomRef = useRef(true);
  const onAtBottomRef = useRef(onAtBottom);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      isNearBottomRef.current = distanceToBottom <= STICKY_SCROLL_THRESHOLD;

      if (distanceToBottom < AT_BOTTOM_TOLERANCE) {
        onAtBottomRef.current?.();
      }
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

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

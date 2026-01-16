import { useEffect, useLayoutEffect, useRef } from "react";

export const STICKY_SCROLL_THRESHOLD = 300;
export const AT_BOTTOM_TOLERANCE = 1;

interface UseAutoscrollOptions {
  onAtBottom?: () => void;
  stickyScrollThreshold?: number;
}

export function useAutoscroll(options: UseAutoscrollOptions = {}) {
  const { onAtBottom, stickyScrollThreshold = STICKY_SCROLL_THRESHOLD } =
    options;

  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isNearBottomRef = useRef(true);
  const onAtBottomRef = useRef(onAtBottom);
  const thresholdRef = useRef(stickyScrollThreshold);

  useLayoutEffect(() => {
    onAtBottomRef.current = onAtBottom;
    thresholdRef.current = stickyScrollThreshold;
  }, [onAtBottom, stickyScrollThreshold]);

  function setRef(node: HTMLElement | null) {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }

    scrollContainerRef.current = node;

    if (!node) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!isNearBottomRef.current) return;

      requestAnimationFrame(() => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      });
    });

    if (node.firstElementChild) {
      resizeObserver.observe(node.firstElementChild);
    }

    resizeObserverRef.current = resizeObserver;
    node.scrollTop = node.scrollHeight;
  }

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;

      isNearBottomRef.current = distanceToBottom <= thresholdRef.current;
      if (distanceToBottom < AT_BOTTOM_TOLERANCE) {
        onAtBottomRef.current?.();
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  return setRef;
}

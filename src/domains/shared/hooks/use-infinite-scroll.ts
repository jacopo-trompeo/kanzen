import { useCallback, useEffect, useRef } from "react";

export const INFINITE_SCROLL_THRESHOLD = 0.1;
export const ROOT_MARGIN = "0px";

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useInfiniteScroll<T extends HTMLElement = HTMLElement>(
  options: UseInfiniteScrollOptions,
) {
  const {
    hasNextPage,
    isFetching,
    onLoadMore,
    threshold = INFINITE_SCROLL_THRESHOLD,
    root = null,
    rootMargin = ROOT_MARGIN,
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const stateRef = useRef({ hasNextPage, isFetching, onLoadMore });

  useEffect(() => {
    stateRef.current = { hasNextPage, isFetching, onLoadMore };
  }, [hasNextPage, isFetching, onLoadMore]);

  const sentinelRef = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const { hasNextPage, isFetching, onLoadMore } = stateRef.current;
          if (entries[0].isIntersecting && hasNextPage && !isFetching) {
            onLoadMore();
          }
        },
        { threshold, root, rootMargin },
      );

      observerRef.current.observe(node);
    },
    [threshold, root, rootMargin],
  );

  return sentinelRef;
}

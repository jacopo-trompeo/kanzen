import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/domains/shared/components/ui/skeleton";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/domains/shared/functions/local-storage";

type Line = {
  id: string;
  text: string;
};

const STORAGE_KEY = "lines";

export const Route = createFileRoute("/_app/text-hooker")({
  component: TextHookerPage,
  ssr: false,
  loader: () => {
    const stored = getFromLocalStorage<Line[]>(STORAGE_KEY) ?? [];
    return { stored };
  },
  pendingComponent: () => {
    return (
      <div className="my-2 flex flex-col gap-2">
        <Skeleton className="h-6 w-[300px]" />
        <Skeleton className="h-6 w-[350px]" />
        <Skeleton className="h-6 w-[450px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[400px]" />
      </div>
    );
  },
});

function TextHookerPage() {
  const { stored } = Route.useLoaderData();
  const [lines, setLines] = useState(stored);

  const handleMutation = useCallback((mutationsList: MutationRecord[]) => {
    let text: string | null = null;

    for (const mutation of mutationsList) {
      if (
        mutation.target !== document.body ||
        mutation.type !== "childList" ||
        mutation.addedNodes.length === 0
      ) {
        continue;
      }

      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;

        const element = node as Element;
        if (element.tagName !== "P") continue;

        text = element.textContent.trim();
        element.remove();
      }
    }

    if (text) {
      setLines((prevLines) => {
        const newLine = {
          id: crypto.randomUUID(),
          text,
        };

        const newState = [...prevLines, newLine];

        setToLocalStorage(STORAGE_KEY, newState);
        return newState;
      });
    }
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(handleMutation);
    const observerOptions = { childList: true, attributes: false };
    observer.observe(document.body, observerOptions);

    return () => {
      observer.disconnect();
    };
  }, [handleMutation]);

  return (
    <div>
      {lines.map((line) => {
        return (
          <div key={line.id}>
            <span>{line.text}</span>
          </div>
        );
      })}
    </div>
  );
}

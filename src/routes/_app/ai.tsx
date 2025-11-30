import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/ai")({
  component: AIPage,
});

function AIPage() {
  return <div>Hello "/_app/ai"!</div>;
}

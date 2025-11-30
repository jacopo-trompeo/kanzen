import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/text-hooker")({
  component: TextHookerPage,
});

function TextHookerPage() {
  return <div>Hello "/_app/text-hooker"!</div>;
}

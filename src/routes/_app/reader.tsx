import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/reader")({
  component: ReaderPage,
});

function ReaderPage() {
  return <div>Hello "/_app/reader"!</div>;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: DictionaryPage,
});

function DictionaryPage() {
  return <div>Hello "/_app/"!</div>;
}

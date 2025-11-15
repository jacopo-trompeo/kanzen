import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/")({
  component: Home,
});

function Home() {
  return <div>Home</div>;
}

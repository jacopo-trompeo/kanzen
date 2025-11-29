import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Layout,
});

function Layout() {
  return (
    <main className="grid min-h-screen w-screen place-items-center">
      <Outlet />
    </main>
  );
}

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/sign-in",
      });
    }

    return { user: context.user };
  },
  component: Layout,
});

function Layout() {
  return <Outlet />;
}

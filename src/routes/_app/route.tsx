import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    const session = await getUser();
    if (!session) {
      throw redirect({
        to: "/sign-in",
      });
    }

    return { session };
  },
  component: Layout,
});

function Layout() {
  return <Outlet />;
}

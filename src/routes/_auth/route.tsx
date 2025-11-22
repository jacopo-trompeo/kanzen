import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const session = await getUser();
    if (session) {
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

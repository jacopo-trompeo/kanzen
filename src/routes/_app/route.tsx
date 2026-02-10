import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/domains/shared/components/app-sidebar";
import {
  getSidebarOpenStateCookie,
  SidebarProvider,
  SidebarTrigger,
} from "@/domains/shared/components/ui/sidebar";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/sign-in",
      });
    }

    return { user: context.user };
  },
  loader: async () => {
    const sidebarOpen = await getSidebarOpenStateCookie();
    return { sidebarOpen };
  },
  component: Layout,
});

function Layout() {
  const { sidebarOpen } = Route.useLoaderData();

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      <AppSidebar />
      <SidebarTrigger />
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

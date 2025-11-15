import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getUser } from "@/functions/get-user";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/(app)/")({
  component: Home,
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
  loader: async ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
});

function Home() {
  const { session } = Route.useRouteContext();
  const navigate = useNavigate();

  return (
    <main>
      <div>Welcome {session?.user.email}</div>
      <Button
        onClick={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                navigate({
                  to: "/auth/sign-in",
                });
              },
            },
          });
        }}
      >
        Logout
      </Button>
    </main>
  );
}

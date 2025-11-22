import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getUser } from "@/functions/get-user";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/_app/")({
  component: Home,
  loader: async () => {
    const session = await getUser();
    return { session };
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
                  to: "/sign-in",
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

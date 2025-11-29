import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/domains/auth/lib/client";
import { Button } from "@/domains/shared/components/ui/button";

export const Route = createFileRoute("/_app/")({
  component: Home,
});

function Home() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  return (
    <main>
      <div>Welcome {user?.email}</div>
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

import { createFileRoute } from "@tanstack/react-router";
import { AuthFormCard } from "@/domains/auth/ui/auth-form-card";
import { SignInForm } from "@/domains/auth/ui/sign-in-form";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignIn,
});

function SignIn() {
  return (
    <AuthFormCard
      title="Sign in to your account"
      description="Enter your information below to sign in to your account."
    >
      <SignInForm />
    </AuthFormCard>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AuthFormCard } from "@/domains/auth/ui/auth-form-card";
import { SignUpForm } from "@/domains/auth/ui/sign-up-form";

export const Route = createFileRoute("/_auth/sign-up")({
  component: SignUp,
});

function SignUp() {
  return (
    <AuthFormCard
      title="Create a new account"
      description="Enter your information below to sign up to a new account."
    >
      <SignUpForm />
    </AuthFormCard>
  );
}

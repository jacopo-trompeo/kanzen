import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { FieldGroupEmailAndPassword } from "./-components/field-group-email-and-password";
import { useSignInForm } from "./-hooks/sign-in-form";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignIn,
});

function SignIn() {
  const form = useSignInForm();

  return (
    <Card className="w-xl">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your information below to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <FieldGroupEmailAndPassword
              form={form}
              fields={{
                email: "email",
                password: "password",
              }}
            />
          </FieldGroup>

          <form.AppForm>
            <form.SubscribeButton className="mt-5">
              Sign In
            </form.SubscribeButton>
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  );
}

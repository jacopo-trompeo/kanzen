import { createFileRoute, Link } from "@tanstack/react-router";
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

          <div className="mt-5 flex flex-col gap-5 text-muted-foreground text-sm">
            <div>
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
            <form.AppForm>
              <form.SubscribeButton>Sign In</form.SubscribeButton>
            </form.AppForm>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

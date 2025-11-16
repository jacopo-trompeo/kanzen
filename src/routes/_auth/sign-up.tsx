import { createFileRoute } from "@tanstack/react-router";
import { TextField } from "@/components/form/text-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { FieldGroupEmailAndPassword } from "./-components/field-group-email-and-password";
import { useSignUpForm } from "./-hooks/sign-up-form";

export const Route = createFileRoute("/_auth/sign-up")({
  component: SignUp,
});

function SignUp() {
  const form = useSignUpForm();

  return (
    <Card className="w-xl">
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>
          Enter your information below to sign up to a new account.
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
            <form.AppField
              name="confirmPassword"
              children={() => (
                <TextField type="password">Confirm Password</TextField>
              )}
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

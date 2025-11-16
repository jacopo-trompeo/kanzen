import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/client";
import { FieldGroupEmailAndPassword } from "./-components/test";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignIn,
});

const signInSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

function SignIn() {
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email({
        ...value,
        callbackURL: "/",
      });
    },
    validators: {
      onChange: signInSchema,
    },
  });

  return (
    <main className="mx-auto max-w-xl">
      <Card>
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
    </main>
  );
}

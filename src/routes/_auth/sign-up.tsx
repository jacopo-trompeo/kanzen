import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as z from "zod";
import { TextField } from "@/components/form/text-field";
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

export const Route = createFileRoute("/_auth/sign-up")({
  component: SignUp,
});

const signUpSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

function SignUp() {
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: "",
        },
        {
          onSuccess: () => {
            navigate({
              to: "/",
            });
          },
        },
      );
    },
    validators: {
      onChange: signUpSchema,
    },
  });

  return (
    <main className="mx-auto max-w-xl">
      <Card>
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
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    if (value !== fieldApi.form.getFieldValue("password")) {
                      return "Passwords do not match";
                    }
                    return undefined;
                  },
                }}
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
    </main>
  );
}

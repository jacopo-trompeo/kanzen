import * as z from "zod";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/client";

const signInSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export function useSignInForm() {
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

  return form;
}

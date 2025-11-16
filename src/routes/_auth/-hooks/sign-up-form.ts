import { useNavigate } from "@tanstack/react-router";
import * as z from "zod";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/client";

const signUpSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function useSignUpForm() {
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

  return form;
}

import * as z from "zod";

const EmailSchema = z.email("Please enter a valid email address.");
const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.");

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignUpSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

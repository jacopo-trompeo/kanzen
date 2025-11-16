import * as z from "zod";

const emailSchema = z.email("Please enter a valid email address.");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.");

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const VALIDATOR_DEBOUNCE_MS = 1000;

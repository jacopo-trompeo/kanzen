import { useNavigate } from "@tanstack/react-router";
import type { SignUpFields } from "@/domains/auth/types";
import { VALIDATOR_DEBOUNCE_MS } from "@/domains/auth/types/constants";
import { signUpSchema } from "@/domains/auth/types/schemas";
import { useAppForm } from "@/domains/shared/hooks/form";
import { authClient } from "../lib/client";

const defaultValues: SignUpFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

export function useSignUpForm() {
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues,
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
      onChangeAsync: signUpSchema,
      onChangeAsyncDebounceMs: VALIDATOR_DEBOUNCE_MS,
    },
  });

  return form;
}

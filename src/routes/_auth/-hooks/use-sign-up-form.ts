import { useNavigate } from "@tanstack/react-router";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/client";
import type { SignUpFields } from "../-shared/types";
import { signUpSchema, VALIDATOR_DEBOUNCE_MS } from "../-shared/validation";

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

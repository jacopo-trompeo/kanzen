import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/client";
import type { BaseAuthFields } from "../-shared/types";
import { signInSchema, VALIDATOR_DEBOUNCE_MS } from "../-shared/validation";

const defaultValues: BaseAuthFields = {
  email: "",
  password: "",
};

export function useSignInForm() {
  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await authClient.signIn.email({
        ...value,
        callbackURL: "/",
      });
    },
    validators: {
      onChangeAsync: signInSchema,
      onChangeAsyncDebounceMs: VALIDATOR_DEBOUNCE_MS,
    },
  });

  return form;
}

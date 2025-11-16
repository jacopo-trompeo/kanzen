import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/client";
import { signInSchema, VALIDATOR_DEBOUNCE_MS } from "../-shared/validation";
import type { BaseAuthFields } from "../-utils/types";

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

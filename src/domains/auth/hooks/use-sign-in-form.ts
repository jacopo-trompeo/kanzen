import type { BaseAuthFields } from "@/domains/auth/types";
import { VALIDATOR_DEBOUNCE_MS } from "@/domains/auth/types/constants";
import { SignInSchema } from "@/domains/auth/types/schemas";
import { useAppForm } from "@/domains/shared/hooks/form";
import { authClient } from "../lib/client";

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
      onChangeAsync: SignInSchema,
      onChangeAsyncDebounceMs: VALIDATOR_DEBOUNCE_MS,
    },
  });

  return form;
}

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SubscribeButton } from "@/domains/shared/components/form/subscribe-button";
import { TextField } from "@/domains/shared/components/form/text-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
});

import { Field, FieldLabel } from "@/domains/shared/components/ui/field";
import { Textarea } from "@/domains/shared/components/ui/textarea";
import { useFieldContext } from "@/domains/shared/hooks/form";
import { ErrorMessages } from "./error-messages";

interface TextareaFieldProps extends React.ComponentProps<"textarea"> {}

export function TextareaField({ children, ...rest }: TextareaFieldProps) {
  const field = useFieldContext<string>();
  const { isTouched, errors } = field.state.meta;
  const displayErrors = isTouched && errors.length > 0;

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{children}</FieldLabel>
      <Textarea
        id={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...rest}
      />
      {displayErrors && <ErrorMessages errors={errors} />}
    </Field>
  );
}

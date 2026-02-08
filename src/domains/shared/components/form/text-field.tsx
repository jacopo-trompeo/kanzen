import { Field, FieldLabel } from "@/domains/shared/components/ui/field";
import { Input } from "@/domains/shared/components/ui/input";
import { useFieldContext } from "@/domains/shared/hooks/form";
import { ErrorMessages } from "./error-messages";

interface TextFieldProps extends React.ComponentProps<"input"> {}

export function TextField({ children, ...rest }: TextFieldProps) {
  const field = useFieldContext<string>();
  const { isTouched, errors } = field.state.meta;
  const displayErrors = isTouched && errors.length > 0;

  return (
    <Field>
      {children && <FieldLabel htmlFor={field.name}>{children}</FieldLabel>}
      <Input
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

import { useFieldContext } from "@/hooks/form";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface TextFieldProps extends React.ComponentProps<"input"> {}

export function TextField({ children, ...rest }: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{children}</FieldLabel>
      <Input
        id={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...rest}
      />
    </Field>
  );
}

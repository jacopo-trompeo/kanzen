import { Field, FieldLabel } from "@/domains/shared/components/ui/field";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/domains/shared/components/ui/select";
import { useFieldContext } from "@/domains/shared/hooks/form";
import { ErrorMessages } from "./error-messages";

interface SelectFieldProps {
  children: React.ReactNode;
  placeholder?: string;
  options: React.ReactNode;
}

export function SelectField({
  children,
  placeholder,
  options,
}: SelectFieldProps) {
  const field = useFieldContext<string>();
  const { isTouched, errors } = field.state.meta;
  const displayErrors = isTouched && errors.length > 0;

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{children}</FieldLabel>
      <Select
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
      >
        <SelectTrigger id={field.name} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{options}</SelectContent>
      </Select>
      {displayErrors && <ErrorMessages errors={errors} />}
    </Field>
  );
}

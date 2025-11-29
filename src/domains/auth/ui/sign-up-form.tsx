import { useSignUpForm } from "@/domains/auth/hooks/use-sign-up-form";
import { TextField } from "@/domains/shared/components/form/text-field";
import { FieldGroup } from "@/domains/shared/components/ui/field";
import { FieldGroupEmailAndPassword } from "./field-group-email-and-password";
import { FormFooter } from "./form-footer";

export function SignUpForm() {
  const form = useSignUpForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldGroupEmailAndPassword
          form={form}
          fields={{
            email: "email",
            password: "password",
          }}
        />
        <form.AppField
          name="confirmPassword"
          children={() => (
            <TextField type="password">Confirm Password</TextField>
          )}
        />
      </FieldGroup>

      <FormFooter
        linkTo="/sign-in"
        text="Already have an account?"
        linkText="Sign in"
      >
        <form.AppForm>
          <form.SubscribeButton>Sign Up</form.SubscribeButton>
        </form.AppForm>
      </FormFooter>
    </form>
  );
}

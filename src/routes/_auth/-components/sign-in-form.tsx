import { FieldGroup } from "@/components/ui/field";
import { useSignInForm } from "../-hooks/use-sign-in-form";
import { FieldGroupEmailAndPassword } from "./field-group-email-and-password";
import { FormFooter } from "./form-footer";

export function SignInForm() {
  const form = useSignInForm();

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
      </FieldGroup>

      <FormFooter
        linkTo="/sign-up"
        text="Don't have an account?"
        linkText="Sign up"
      >
        <form.AppForm>
          <form.SubscribeButton>Sign In</form.SubscribeButton>
        </form.AppForm>
      </FormFooter>
    </form>
  );
}

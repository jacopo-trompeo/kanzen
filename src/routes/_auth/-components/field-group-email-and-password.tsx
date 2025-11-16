import { TextField } from "@/components/form/text-field";
import { withFieldGroup } from "@/hooks/form";

export const FieldGroupEmailAndPassword = withFieldGroup({
  defaultValues: {
    email: "",
    password: "",
  },
  render: ({ group }) => {
    return (
      <>
        <group.AppField
          name="email"
          children={() => (
            <TextField type="email" placeholder="mail@example.com">
              Email
            </TextField>
          )}
        />
        <group.AppField
          name="password"
          children={() => <TextField type="password">Password</TextField>}
        />
      </>
    );
  },
});

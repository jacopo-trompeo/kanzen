import type { BaseAuthFields } from "@/domains/auth/types";
import { TextField } from "@/domains/shared/components/form/text-field";
import { withFieldGroup } from "@/domains/shared/hooks/form";

export const FieldGroupEmailAndPassword = withFieldGroup<
  BaseAuthFields,
  unknown
>({
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

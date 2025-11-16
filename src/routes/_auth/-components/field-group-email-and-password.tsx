import { TextField } from "@/components/form/text-field";
import { withFieldGroup } from "@/hooks/form";
import type { BaseAuthFields } from "../-shared/types";

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

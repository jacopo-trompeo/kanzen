import { Button } from "@/domains/shared/components/ui/button";
import { useFormContext } from "@/domains/shared/hooks/form";

interface SubscribeButtonProps extends React.ComponentProps<"button"> {}

export function SubscribeButton({
  children,
  type = "submit",
  disabled,
  ...rest
}: SubscribeButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [
        state.canSubmit,
        state.isSubmitting,
        state.isPristine,
      ]}
      children={([canSubmit, isSubmitting, isPristine]) => (
        <Button
          type={type}
          disabled={
            disabled !== undefined ? disabled : !canSubmit || isPristine
          }
          {...rest}
        >
          {isSubmitting ? "..." : children}
        </Button>
      )}
    />
  );
}

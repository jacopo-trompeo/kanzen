export function ErrorMessages({
  errors,
}: {
  errors: Array<string | { message: string }>;
}) {
  return (
    <div className="flex flex-col gap-1">
      {errors.map((error) => (
        <span
          key={typeof error === "string" ? error : error.message}
          className="text-sm text-red-500"
        >
          {typeof error === "string" ? error : error.message}
        </span>
      ))}
    </div>
  );
}

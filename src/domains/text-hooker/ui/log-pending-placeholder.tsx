import { Skeleton } from "@/domains/shared/components/ui/skeleton";

export function LogPendingPlaceholder() {
  return (
    <div className="my-2 flex flex-col gap-2">
      <Skeleton className="h-6 w-[300px]" />
      <Skeleton className="h-6 w-[350px]" />
      <Skeleton className="h-6 w-[450px]" />
      <Skeleton className="h-6 w-[200px]" />
      <Skeleton className="h-6 w-[400px]" />
    </div>
  );
}

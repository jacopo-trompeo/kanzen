import type * as z from "zod";

export function isZodEnum<T extends z.ZodTypeAny>(
  schema: T,
  value: unknown
): value is z.infer<T> {
  return schema.safeParse(value).success;
}

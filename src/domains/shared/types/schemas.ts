import * as z from "zod";

export const PaginatedRequestSchema = z.object({
  limit: z.number().min(1).max(50).default(15),
  offset: z.number().min(0).default(0),
});

export type PaginatedRequest = z.infer<typeof PaginatedRequestSchema>;

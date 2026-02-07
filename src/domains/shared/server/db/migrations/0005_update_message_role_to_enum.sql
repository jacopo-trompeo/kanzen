CREATE TYPE "public"."role" AS ENUM('user', 'assistant', 'system');--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";
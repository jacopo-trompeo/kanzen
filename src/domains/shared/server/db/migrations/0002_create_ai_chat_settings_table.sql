CREATE TABLE "ai_chat_settings" (
	"user_id" text PRIMARY KEY NOT NULL,
	"api_key" text,
	"model" text,
	"system_prompt" text
);
--> statement-breakpoint
ALTER TABLE "ai_chat_settings" ADD CONSTRAINT "ai_chat_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
CREATE TABLE "global_settings" (
	"user_id" text PRIMARY KEY NOT NULL,
	"theme" text DEFAULT 'system' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "text_hooker_settings" (
	"user_id" text PRIMARY KEY NOT NULL,
	"font_size" integer DEFAULT 20 NOT NULL,
	"websocket_url" text DEFAULT 'ws://localhost:6677',
	CONSTRAINT "font_size_min_value" CHECK ("text_hooker_settings"."font_size" >= 1),
	CONSTRAINT "websocket_url_format" CHECK ("text_hooker_settings"."websocket_url" IS NULL OR "text_hooker_settings"."websocket_url" ~ '^wss?://.+')
);
--> statement-breakpoint
ALTER TABLE "global_settings" ADD CONSTRAINT "global_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "text_hooker_settings" ADD CONSTRAINT "text_hooker_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
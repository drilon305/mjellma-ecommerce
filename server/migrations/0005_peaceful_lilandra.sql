ALTER TABLE "email_tokens" DROP CONSTRAINT "email_tokens_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "email_tokens" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "email_tokens" DROP COLUMN IF EXISTS "userId";
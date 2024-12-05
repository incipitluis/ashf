CREATE TYPE "public"."type_blog" AS ENUM('PAPER', 'JOURNAL', 'INTRO');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "journals_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"journal_volume" text,
	"journal_number" text,
	"journal_year" text,
	"content" text
);
--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN "papers_content_id" uuid;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN "journals_content_id" uuid;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN "type" "type_blog";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog" ADD CONSTRAINT "blog_papers_content_id_papers_content_id_fk" FOREIGN KEY ("papers_content_id") REFERENCES "public"."papers_content"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog" ADD CONSTRAINT "blog_journals_content_id_journals_content_id_fk" FOREIGN KEY ("journals_content_id") REFERENCES "public"."journals_content"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

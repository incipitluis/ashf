CREATE TABLE IF NOT EXISTS "papers_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text
);

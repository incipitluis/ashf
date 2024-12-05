CREATE TABLE IF NOT EXISTS "blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text,
	"important_fragment" text,
	"keywords" text,
	"author" varchar(255),
	"likes" integer DEFAULT 0,
	"url" varchar(255),
	"image" varchar(255),
	"created_at" varchar(255) DEFAULT CURRENT_TIMESTAMP
);

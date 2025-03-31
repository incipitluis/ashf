CREATE TABLE IF NOT EXISTS "data_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"authors" text,
	"numberofauthors" text,
	"original" text,
	"doi" text,
	"filiacion" text,
	"miembroconsejo" text,
	"extranjero" text,
	"genero" text,
	"journal" text,
	"created_at" text DEFAULT CURRENT_TIMESTAMP
);

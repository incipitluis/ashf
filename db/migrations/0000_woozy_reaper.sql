CREATE TYPE "public"."estado_libro" AS ENUM('ACEPTADO', 'CERTIFICADO');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "libros" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"autor" varchar(255) NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"estado" "estado_libro",
	"resumen" text,
	"created_at" varchar(255) DEFAULT CURRENT_TIMESTAMP
);

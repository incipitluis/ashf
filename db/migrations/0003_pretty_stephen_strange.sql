ALTER TYPE "public"."estado_libro" ADD VALUE 'RECHAZADO';--> statement-breakpoint
ALTER TYPE "public"."estado_libro" ADD VALUE 'PENDIENTE';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "solicitudes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"revisor" varchar(255) NOT NULL,
	"articulo" varchar(255) NOT NULL,
	"year" text NOT NULL,
	"estado" "estado_libro",
	"created_at" varchar(255) DEFAULT CURRENT_TIMESTAMP
);

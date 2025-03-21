ALTER TABLE "articles_anales_limpio" RENAME TO "articles_anales";--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "titulo" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "resumen" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "nombre_autor_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "apellidos_autor_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "correo_electronico_autor_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "titulo_seccion" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "idioma" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "asuntos" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "estado" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "doi" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "fecha_envio" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles_anales" ALTER COLUMN "ultima_modificacion" DROP NOT NULL;
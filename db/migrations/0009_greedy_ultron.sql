CREATE TABLE IF NOT EXISTS "articles_anales_limpio" (
	"id_envio" text PRIMARY KEY NOT NULL,
	"titulo" text NOT NULL,
	"resumen" text NOT NULL,
	"nombre_autor_1" text NOT NULL,
	"apellidos_autor_1" text NOT NULL,
	"correo_electronico_autor_1" text NOT NULL,
	"titulo_seccion" text NOT NULL,
	"idioma" text NOT NULL,
	"asuntos" text NOT NULL,
	"estado" text NOT NULL,
	"url" text NOT NULL,
	"doi" text NOT NULL,
	"fecha_envio" timestamp with time zone NOT NULL,
	"ultima_modificacion" timestamp with time zone NOT NULL
);

import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, integer, text, pgEnum } from "drizzle-orm/pg-core";

export const estadoLibroEnum = pgEnum('estado_libro', ['ACEPTADO', 'CERTIFICADO']);

export const libros = pgTable('libros', {
  id: uuid('id').defaultRandom().primaryKey(),
  autor: varchar('autor', { length: 255 }).notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  year: integer('year').notNull(),
  estado: estadoLibroEnum('estado'),
  resumen: text('resumen'),
  createdAt: varchar('created_at', { length: 255 }).default(sql`CURRENT_TIMESTAMP`),
});

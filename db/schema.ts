import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, text, pgEnum } from "drizzle-orm/pg-core";

export const estadoLibroEnum = pgEnum('estado_libro', ['ACEPTADO', 'CERTIFICADO']);

export const articulos = pgTable('articulos', {
  id: uuid('id').defaultRandom().primaryKey(),
  autor: varchar('autor', { length: 255 }).notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  year: text('year').notNull(),
  estado: estadoLibroEnum('estado').$default(() => 'ACEPTADO'),
  resumen: text('resumen'),
  createdAt: varchar('created_at', { length: 255 }).default(sql`CURRENT_TIMESTAMP`),
});

export type InsertArticle = typeof articulos.$inferInsert;
export type SelectArticle = typeof articulos.$inferSelect;  
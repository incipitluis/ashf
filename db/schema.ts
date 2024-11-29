import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, text, pgEnum, integer } from "drizzle-orm/pg-core";

export type EstadoSolicitud = 'ACEPTADO' | 'CERTIFICADO' | 'RECHAZADO' | 'PENDIENTE';
export const estadoLibroEnum = pgEnum('estado_libro', ['ACEPTADO', 'CERTIFICADO', 'RECHAZADO', 'PENDIENTE']);

export const articulos = pgTable('articulos', {
  id: uuid('id').defaultRandom().primaryKey(),
  autor: varchar('autor', { length: 255 }).notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  year: text('year').notNull(),
  estado: estadoLibroEnum('estado').$default(() => 'ACEPTADO'),
  resumen: text('resumen'),
  createdAt: varchar('created_at', { length: 255 }).default(sql`CURRENT_TIMESTAMP`),
});


export const solicitudes = pgTable('solicitudes', {
  id: uuid('id').defaultRandom().primaryKey(),
  revisor: varchar('revisor', { length: 255 }).notNull(),
  articulo: varchar('articulo', { length: 255 }).notNull(),
  year: text('year').notNull(),
  estado: estadoLibroEnum('estado').$default(() => 'PENDIENTE'),
  createdAt: varchar('created_at', { length: 255 }).default(sql`CURRENT_TIMESTAMP`),
});


export const blog = pgTable('blog', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  author: varchar('author', { length: 255 }),
  likes: integer('likes').default(0),
  url: varchar('url', { length: 255 }),
  image: varchar('image', { length: 255 }),
  createdAt: varchar('created_at', { length: 255 }).default(sql`CURRENT_TIMESTAMP`),
});

export type InsertSolicitud = typeof solicitudes.$inferInsert;
export type SelectSolicitud = typeof solicitudes.$inferSelect;

export type InsertBlog = typeof blog.$inferInsert;
export type SelectBlog = typeof blog.$inferSelect;

export type InsertArticle = typeof articulos.$inferInsert;
export type SelectArticle = typeof articulos.$inferSelect;  
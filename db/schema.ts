import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, text, pgEnum, integer, boolean, timestamp, bigint, smallint } from "drizzle-orm/pg-core";

export type EstadoSolicitud = 'ACEPTADO' | 'CERTIFICADO' | 'RECHAZADO' | 'PENDIENTE';
export const estadoLibroEnum = pgEnum('estado_libro', ['ACEPTADO', 'CERTIFICADO', 'RECHAZADO', 'PENDIENTE']);
export const typeBlogEnum = pgEnum('type_blog', ['PAPER', 'JOURNAL', 'INTRO']);

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
  importantFragment: text('important_fragment'),
  keywords: text('keywords'),
  author: varchar('author', { length: 255 }),
  likes: integer('likes').default(0),
  url: varchar('url', { length: 255 }),
  image: varchar('image', { length: 255 }),
  papersContentId: uuid('papers_content_id').references(() => papersContent.id),
  journalsContentId: uuid('journals_content_id').references(() => journalsContent.id),
  type: typeBlogEnum('type').$default(() => 'PAPER'),
  createdAt: varchar('created_at', { length: 255 }).default(sql`CURRENT_TIMESTAMP`),
});

export const papersContent = pgTable('papers_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content'),
});

export const journalsContent = pgTable('journals_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  journalVolume: text('journal_volume'),
  journalNumber: text('journal_number'),
  journalYear: text('journal_year'),
  content: text('content'),
});

// Django Auth Tables
export const authGroup = pgTable('auth_group', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
});

export const authPermission = pgTable('auth_permission', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  contentTypeId: integer('content_type_id').notNull(),
  codename: varchar('codename', { length: 100 }).notNull(),
});

export const authGroupPermissions = pgTable('auth_group_permissions', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  groupId: integer('group_id').notNull(),
  permissionId: integer('permission_id').notNull(),
});

export const authUser = pgTable('auth_user', {
  id: integer('id').primaryKey(),
  password: varchar('password', { length: 128 }).notNull(),
  lastLogin: timestamp('last_login', { withTimezone: true }),
  isSuperuser: boolean('is_superuser').notNull(),
  username: varchar('username', { length: 150 }).notNull(),
  firstName: varchar('first_name', { length: 150 }).notNull(),
  lastName: varchar('last_name', { length: 150 }).notNull(),
  email: varchar('email', { length: 254 }).notNull(),
  isStaff: boolean('is_staff').notNull(),
  isActive: boolean('is_active').notNull(),
  dateJoined: timestamp('date_joined', { withTimezone: true }).notNull(),
});

export const authUserGroups = pgTable('auth_user_groups', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  userId: integer('user_id').notNull(),
  groupId: integer('group_id').notNull(),
});

export const authUserPermissions = pgTable('auth_user_user_permissions', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  userId: integer('user_id').notNull(),
  permissionId: integer('permission_id').notNull(),
});

// Django Admin and Session Tables
export const djangoAdminLog = pgTable('django_admin_log', {
  id: integer('id').primaryKey(),
  actionTime: timestamp('action_time', { withTimezone: true }).notNull(),
  objectId: text('object_id'),
  objectRepr: varchar('object_repr', { length: 200 }).notNull(),
  actionFlag: smallint('action_flag').notNull(),
  changeMessage: text('change_message').notNull(),
  contentTypeId: integer('content_type_id'),
  userId: integer('user_id').notNull(),
});

export const djangoContentType = pgTable('django_content_type', {
  id: integer('id').primaryKey(),
  appLabel: varchar('app_label', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
});

export const djangoMigrations = pgTable('django_migrations', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  app: varchar('app', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  applied: timestamp('applied', { withTimezone: true }).notNull(),
});

export const djangoSession = pgTable('django_session', {
  sessionKey: varchar('session_key', { length: 40 }).primaryKey(),
  sessionData: text('session_data').notNull(),
  expireDate: timestamp('expire_date', { withTimezone: true }).notNull(),
});

export type InsertJournalsContent = typeof journalsContent.$inferInsert;
export type SelectJournalsContent = typeof journalsContent.$inferSelect;

export type InsertPapersContent = typeof papersContent.$inferInsert;
export type SelectPapersContent = typeof papersContent.$inferSelect;

export type InsertSolicitud = typeof solicitudes.$inferInsert;
export type SelectSolicitud = typeof solicitudes.$inferSelect;

export type InsertBlog = typeof blog.$inferInsert;
export type SelectBlog = typeof blog.$inferSelect;

export type InsertArticle = typeof articulos.$inferInsert;
export type SelectArticle = typeof articulos.$inferSelect;

export type SelectAuthGroup = typeof authGroup.$inferSelect;
export type InsertAuthGroup = typeof authGroup.$inferInsert;

export type SelectAuthUser = typeof authUser.$inferSelect;
export type InsertAuthUser = typeof authUser.$inferInsert;
  
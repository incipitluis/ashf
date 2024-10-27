"use server"
import { db } from "@/db/drizzle";
import { articulos } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getArticles(autor: string, titulo: string, year: number){
  const data = await db.select().from(articulos).where(and(eq(articulos.autor, autor), eq(articulos.titulo, titulo), eq(articulos.year, year)));
  return data;
}

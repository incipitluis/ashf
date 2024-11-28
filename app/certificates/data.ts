"use server"
import { db } from "@/db/drizzle";
import { articulos } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getArticlesForCheck(autor: string, titulo: string, year: string){
  const data = await db.select().from(articulos).where(and(eq(articulos.autor, autor), eq(articulos.titulo, titulo), eq(articulos.year, year)));
  return data;
}

export async function getArticleById(id: string) {
  const data = await db.select().from(articulos).where(eq(articulos.id, id));
  return data;
}

export async function getArticlesFromWebScraping(){
  const response = await fetch("http://127.0.0.1:8000/scrape");
  const data = await response.json();
  return data;
}
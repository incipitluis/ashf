"use server";
import { db } from "@/db/drizzle";
import { articulos } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

export async function getData() {
    const sql = neon(process.env.DATABASE_URL as string);
    const data = await sql`...`;
    return data;
}

export async function updateArticleStatus(id: string){
  await db.update(articulos).set({estado: 'CERTIFICADO'}).where(eq(articulos.id, id));
}
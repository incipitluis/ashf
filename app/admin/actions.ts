"use server"
import { db } from "@/db/drizzle";

import { articulos } from "@/db/schema";
import { InsertArticle } from "@/db/schema";

export async function createArticle(article: InsertArticle){
  await db.insert(articulos).values(article);
}

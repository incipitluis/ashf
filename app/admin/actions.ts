"use server"
import { db } from "@/db/drizzle";

import { articulos, EstadoSolicitud, solicitudes } from "@/db/schema";
import { InsertArticle } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createArticle(article: InsertArticle){
  await db.insert(articulos).values(article);
}

export async function updateSolicitudStatus(id: string, status: EstadoSolicitud){
  await db.update(solicitudes).set({ estado: status }).where(eq(solicitudes.id, id));
  revalidatePath('/admin/manage-solic');
}

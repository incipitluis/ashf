"use server";
import { db } from "@/db/drizzle";
import { articulos, analesReviews, type InsertAnalesReviews, articlesAnales } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { getArticlesFromWebScraping } from "./data";
import fs from 'fs';
import path from 'path';

export async function getData() {
    const sql = neon(process.env.DATABASE_URL as string);
    const data = await sql`...`;
    return data;
}

export async function updateArticleStatus(id: string){
  await db.update(articulos).set({estado: 'CERTIFICADO'}).where(eq(articulos.id, id));
}

export async function setPreviousArticles(){
   const data = await getArticlesFromWebScraping();
   console.log(data);
  for (const article of data) {
    await db.insert(articulos).values(article);
  }
}

export async function setAnalesReviews(){
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'app/utils/reviews-20250320.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const reviews = JSON.parse(fileContent);
    
    // Process and insert each review
    for (const review of reviews) {
      const reviewData: InsertAnalesReviews = {
        fase: review["﻿Fase"] || null,
        ronda: review["Ronda"] || null,
        tituloEnvio: review["Título del envío"] || null,
        idEnvio: review["ID del envío"] || null,
        revisorUsername: review["Revisor/a"] || null,
        revisorNombre: review["Nombre"] || null,
        revisorApellidos: review["Apellidos"] || null,
        identificadorOrcid: review["Identificador ORCID"] || null,
        pais: review["País"] || null,
        afiliacion: review["Afiliación"] || null,
        correoElectronico: review["Correo electrónico"] || null,
        interesesRevision: review["Intereses de revisión"] || null,
        fechaAsignada: review["Fecha asignada"] || null,
        fechaNotificada: review["Fecha notificada"] || null,
        fechaConfirmada: review["Fecha confirmada"] || null,
        fechaCompletada: review["Fecha completada"] || null,
        sinConsiderar: review["Sin considerar"] || null,
        fechaRecordatorio: review["Fecha recordatorio"] || null,
        fechaLimiteContestacion: review["Fecha límite de la contestación"] || null,
        diasVencimientoRespuesta: review["Días de vencimiento de la respuesta"] || null,
        fechaLimiteRevision: review["Fecha límite de la revisión"] || null,
        diasVencimientoRevision: review["Días de vencimiento de la revisión"] || null,
        rechazado: review["Rechazado"] || null,
        recomendacion: review["Recomendación"] || null,
        comentariosEnvio: review["Comentarios sobre el envío"] || null,
      };
      
      await db.insert(analesReviews).values(reviewData);
    }
    
    return { success: true, message: `Imported ${reviews.length} reviews successfully` };
  } catch (error) {
    console.error("Error importing reviews:", error);
    return { success: false, message: `Error importing reviews: ${error}` };
  }
}

export async function setArticlesAnales(){
  const filePath = path.join(process.cwd(), 'app/utils/articles-anales-limpio.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const articles = JSON.parse(fileContent);
  for (const article of articles) {
    await db.insert(articlesAnales).values({
      idEnvio: article["Id. del envío"] || null,
      titulo: article["Título"] || null,
      resumen: article["Resumen"] || null,
      nombreAutor1: article["Nombre (Autor/a 1)"] || null,
      apellidosAutor1: article["Apellidos (Autor/a 1)"] || null,
      correoElectronicoAutor1: article["Correo electrónico (Autor/a 1)"] || null,
      tituloSeccion: article["Título de sección"] || null,
      idioma: article["Idioma"] || null,
      asuntos: article["Asuntos"] || null,
      estado: article["Estado"] || null,
      url: article["URL"] || null,
      doi: article["DOI"] || null,
      fechaEnvio: article["Fecha de envío"] || null,
      ultimaModificacion: article["Última modificación"] || null,
    });
  }
}
  

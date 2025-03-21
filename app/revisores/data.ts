"use server"

import { db } from "@/db/drizzle"
import { analesReviews, articlesAnales, lasTorresDeLuccaReviews, rPubReviews, SelectAnalesReviews } from "@/db/schema"
import { sql, and, eq, isNotNull } from "drizzle-orm"


export async function getRevisores(year: string){
  const data = await db.select().from(analesReviews)
    .where(and(sql`"fecha_completada"::text ILIKE '%${year}%'`, isNotNull(analesReviews.fechaCompletada)))
    
  // Crear un objeto para rastrear reviews ya procesadas
  const uniqueReviews = new Map();
  
  // Filtrar para mantener solo un registro por cada combinación de idEnvio y revisorUsername
  const filteredData = data.filter((review) => {
    const key = `${review.idEnvio}-${review.revisorUsername}`;
    
    // Si esta combinación ya existe, no incluir este registro
    if (uniqueReviews.has(key)) {
      return false;
    }
    
    // Registrar esta combinación y mantener este registro
    uniqueReviews.set(key, true);
    return true;
  });
  
  return filteredData;
}

export async function getTotalArticles(){
  const data = await db.select().from(articlesAnales)
  return data
}


export async function getRevisoresByArticlePublishedAndYear(state: string, year: string) {
 
  let filteredArticles = []
  if (state === "Else"){
    filteredArticles = await db.select().from(articlesAnales)
      .where(sql`estado != 'Publicado' AND estado != 'Rechazado'`);
  } else {
    filteredArticles = await db.select().from(articlesAnales)
      .where(sql`estado = ${state}`);
  }
  

  const filteredArticleIds = filteredArticles.map(article => article.idEnvio);
  
  // Obtenemos los revisores que revisaron artículos publicados en el año especificado
  const data = await db.select().from(analesReviews)
    .where(sql`EXTRACT(YEAR FROM "fecha_asignada"::timestamp) = ${year} AND id_envio IN (${filteredArticleIds.join(',')})`);
  
  // Aplicamos el mismo filtro que se usa en las otras funciones
  const filteredData = data.filter((review, index, self) => 
    self.filter(r => r.idEnvio === review.idEnvio && r.revisorUsername === review.revisorUsername).length > 1
  );
  
  return filteredData;
}


export const getReviewersByArticleIds = async (articleIds: string[], journal: string) => {

  const table = journal === 'anales' ? analesReviews
   : journal === 'rpub' ? rPubReviews
   : lasTorresDeLuccaReviews;

  const result = [] as SelectAnalesReviews[];
  const noReviewersIds: string[] = [];
  // Mapa para controlar combinaciones únicas de idEnvio-revisorUsername
  const uniqueReviewers = new Map<string, boolean>();

  for (const articleId of articleIds) {
    try {
      
      const reviewers = await db.select().from(table)
        .where(eq(table.idEnvio, articleId));
      
      if (reviewers.length > 0) {
        // Filtrar duplicados antes de añadir al resultado
        reviewers.forEach(reviewer => {
          const key = `${reviewer.idEnvio}-${reviewer.revisorUsername}`;
          if (!uniqueReviewers.has(key)) {
            uniqueReviewers.set(key, true);
            result.push(reviewer);
          }
        });
      } else {
        noReviewersIds.push(articleId);
      }
    } catch (error) {
      console.error('Error getting reviewers:', error);
      noReviewersIds.push(articleId);
    }
  }

  console.log("Artículos sin revisores:", noReviewersIds);
  return { 
    reviewers: result, 
    noReviewersIds 
  };
}
"use server"

import { db } from "@/db/drizzle";
import { solicitudes } from "@/db/schema";


export const createSolicitudCertificadoRevision = async (revisor: string, articulo: string, year: string) => {
    await db.insert(solicitudes).values({revisor, articulo, year});
}   
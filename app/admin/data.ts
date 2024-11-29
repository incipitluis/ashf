import { db } from "@/db/drizzle";
import { solicitudes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCertificatesRequests() {
    const data = await db.select().from(solicitudes).where(eq(solicitudes.estado, 'PENDIENTE'));
    return data;
}
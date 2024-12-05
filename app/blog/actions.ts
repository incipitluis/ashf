import { db } from "@/db/drizzle";
import { blog } from "@/db/schema";
import { eq, sql } from "drizzle-orm";


export async function incrementLikes(id: string) {
    await db.update(blog).set({ likes: sql`${blog.likes} + 1` }).where(eq(blog.id, id));
}
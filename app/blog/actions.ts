'use server'

import { db } from "@/db/drizzle";
import { blog } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

import { revalidatePath } from "next/cache";

export async function incrementLikes(id: string, path: string) {
    await db.update(blog).set({ likes: sql`${blog.likes} + 1` }).where(eq(blog.id, id));
    revalidatePath(path);
}
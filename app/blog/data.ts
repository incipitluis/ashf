import { db } from "@/db/drizzle";
import { journalsContent, papersContent } from "@/db/schema";
import { eq, isNull } from "drizzle-orm";
import { blog } from "@/db/schema";

export async function getUnprocessedPapers() {
    const papers = await db
        .select({
            id: papersContent.id,
            content: papersContent.content,
        })
        .from(papersContent)
        .leftJoin(blog, eq(papersContent.id, blog.papersContentId))
        .where(isNull(blog.id));
    
    return papers[0];
} 

export async function getUnprocessedJournals() {
    const journals = await db
        .select({
            id: journalsContent.id,
            journalVolume: journalsContent.journalVolume,
            journalNumber: journalsContent.journalNumber,
            journalYear: journalsContent.journalYear,
            content: journalsContent.content,
        })
        .from(journalsContent)
        .leftJoin(blog, eq(journalsContent.id, blog.journalsContentId))
        .where(isNull(blog.id));
    return journals[0];
}

export async function getPaperContent(){
    const paper = await db
        .select({
            content: papersContent.content,
        })
        .from(papersContent);
    return paper[0];
}

export async function getBlogPosts() {
    const posts = await db.select().from(blog);
    return posts;
}

export async function getBlogPostById(id: string) {
    const post = await db.select().from(blog).where(eq(blog.id, id));
    return post[0];
}
import { sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/drizzle"
import { articulos } from "@/db/schema"

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams.get("query");
    const results = await db.select().from(articulos).where(
      sql`${articulos.titulo} ILIKE ${`%${query}%`}`
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Error fetching search results" },
      { status: 500 }
    );
  }
};

import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getArticleById } from "@/app/certificates/data"

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  try {
    const data = await getArticleById(id)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
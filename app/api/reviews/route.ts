import { NextRequest, NextResponse } from "next/server"
import { setReviews } from "@/app/certificates/actions"

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const journal = searchParams.get('journal');
  try {
    const data = await setReviews({journal: journal || ''})
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
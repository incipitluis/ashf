import { NextResponse } from "next/server"
import { setAnalesReviews } from "@/app/certificates/actions"

export const POST = async () => {
  try {
    const data = await setAnalesReviews()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
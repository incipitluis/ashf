import { NextRequest, NextResponse } from "next/server";
import { getRevisores } from "@/app/revisores/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const journal = searchParams.get('journal');
  const year = searchParams.get('year');
 
  if (!journal || !year) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }
  console.log("journal", journal);
  console.log("year", year);

  const reviewers = await getRevisores(year, journal);
  console.log("reviewers", reviewers);
  return NextResponse.json(reviewers);
}
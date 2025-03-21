import { NextRequest, NextResponse } from "next/server";
import { getReviewersByArticleIds } from "@/app/revisores/data";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const articleIds = searchParams.get('articleIds');
  const journal = searchParams.get('journal');
  if (!articleIds) {
    return NextResponse.json({ error: 'Article IDs are required' }, { status: 400 });
  }
  if (!journal) {
    return NextResponse.json({ error: 'Journal is required' }, { status: 400 });
  }
  const reviewers = await getReviewersByArticleIds(articleIds.split(','), journal);
  return NextResponse.json(reviewers);
}
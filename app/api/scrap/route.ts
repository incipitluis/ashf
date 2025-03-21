import { NextRequest, NextResponse } from "next/server";
import { scrapJournalArticles, scrapJournalIssues } from "@/app/utils/scrapper";

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const journal = searchParams.get('journal');
  const year = searchParams.get('year');

  console.log("year", year, "journal", journal); 

  if (!year) {
    return NextResponse.json({ error: 'Year is required' }, { status: 400 });
  }

  let url = '';
  if (journal === 'anales') {
    url = 'https://revistas.ucm.es/index.php/ASHF/issue/archive';
  } else if (journal === 'rpub') {
    url = 'https://revistas.ucm.es/index.php/RPUB/issue/archive';
  } else if (journal === 'ltdl') {
    url = 'https://revistas.ucm.es/index.php/LTDL/issue/archive';
  }

  const journalIssues = await scrapJournalIssues({url: url, year});

  if (!journalIssues) {
    return NextResponse.json({ error: 'No issues found' }, { status: 404 });
  }

  let issues = [];
  for (const issue of journalIssues) {
   const result = await scrapJournalArticles(issue.url);
   issues.push(result);
  }

  return NextResponse.json(issues);
}
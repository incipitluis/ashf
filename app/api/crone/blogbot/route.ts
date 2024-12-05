import { getUnprocessedPapers, getUnprocessedJournals } from "@/app/blog/data";
import { db } from "@/db/drizzle";
import { blog } from "@/db/schema";

const authors = [
  "Yuki Tanaka",
  "Elena Kovač",
  "Amir Al-Rashid",
  "Sofia Santos",
  "Marcus Blackwood",
];

const promptKeys = ['paper', 'journal', 'intro']
const serverAction = {
    paper: getUnprocessedPapers,
    journal: getUnprocessedJournals,
    intro: getUnprocessedPapers
}

type Paper = { id: string; content: string };
type Journal = { id: string; 
    journalVolume: string | null; 
    journalNumber: string | null; 
    journalYear: string | null; 
    content: string 
};

export async function POST(req: Request) {

  const authHeader = req.headers.get('authorization');
  const promptKey = req.headers.get('promptKey');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  if (!promptKey || !promptKeys.includes(promptKey)) {
    return new Response('Invalid prompt key', { status: 400 });
  }

  const source = await serverAction[promptKey as keyof typeof serverAction]() as Paper | Journal;

  const sourceId = source.id

  if (!source.content) {
    return new Response('No content', { status: 400 });
  }

  const sourceContent = promptKey === 'journal' ? {
    journalVolume: (source as Journal).journalVolume ?? null,
    journalNumber: (source as Journal).journalNumber ?? null,
    journalYear: (source as Journal).journalYear ?? null,
    content: (source as Journal).content
  } : (source as Paper).content
 

  try {
  
    const response = await fetch(`${process.env.BASE_URL}/api/blogbot?promptKey=${promptKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sourceContent),
    });

    const result = await response.json();
    console.log("🚀🚀🚀 result", result)

    const author = authors[Math.floor(Math.random() * authors.length)];

    const type = promptKey.toUpperCase() as 'PAPER' | 'JOURNAL' | 'INTRO'

    await db.insert(blog).values({
      title: result.title,
      content: result.blogPost,
      importantFragment: result.importantFragment,
      keywords: result.keywords,
      url: result.doiUrl,
      author: author,
      type: type,
      papersContentId: promptKey === 'intro' ? null : sourceId,
      journalsContentId: promptKey === 'paper' ? null : sourceId,
    });

    return new Response('Success', { status: 200 });
  } catch (error) {
    console.error('Error generating blog post:', error);
    return new Response('Error', { status: 500 });
  }
}
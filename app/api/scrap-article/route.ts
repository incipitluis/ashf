import { NextRequest, NextResponse } from 'next/server';
import { scraperArticle } from '@/app/utils/scraperarticle';
import { dataArticles } from '@/db/schema';
import { db } from '@/db/drizzle';

export async function GET(request: NextRequest) {
  try {
    // Get search params from the request URL
    const searchParams = request.nextUrl.searchParams;
    const revista = searchParams.get('revista');
    const idString = searchParams.get('id');

    // Check if required parameters are provided
    if (!revista || !idString) {
      return NextResponse.json(
        { error: 'Missing required parameters: revista and id' },
        { status: 400 }
      );
    }

    // Split the id string by commas to get individual IDs
    const ids = idString.split(',').map(id => id.trim());

    // Array to hold results
    const results = [];

    // Process each ID sequentially
    for (const id of ids) {
      try {
        const articleData = await scraperArticle(revista, id);
        results.push({
          articleData
        });

        await db.insert(dataArticles).values({
          title: articleData.titulo,
          authors: articleData.autores.join(', '),
          numberofauthors: articleData.numeroDeAutores.toString(),
          filiacion: articleData.filiacion.join(', '),
          original: "sí",
          doi: articleData.doi,
          journal: revista,
        });

      } catch (error) {
        // Add failed result with error message
        results.push({
          id,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Return the results
    return NextResponse.json({ 
      results 
    });

  } catch (error) {
    console.error('Error in scrap-article route:', error);
    return NextResponse.json(
      { error: 'Failed to process request', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

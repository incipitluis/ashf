import axios from 'axios';
import * as cheerio from 'cheerio';

interface ArticleMetadata {
  titulo: string;
  autores: string[];
  numeroDeAutores: number;
  filiacion: string[];
  doi: string;
}

/**
 * Scrapes article metadata from revistas.ucm.es
 * @param revista The journal code (e.g., "LTDL")
 * @param id The article ID (e.g., "99122")
 * @returns Article metadata including title, authors, affiliations, and DOI
 */
export async function scraperArticle(revista: string, id: string): Promise<ArticleMetadata> {
  try {
    // Compose the URL for the article
    const url = `https://revistas.ucm.es/index.php/${revista}/article/view/${id}`;
    
    // Fetch the HTML content
    const response = await axios.get(url);
    const html = response.data;
    
    // Load HTML into cheerio
    const $ = cheerio.load(html);
    
    // Check if the article type is one of the excluded types
    const articleType = $('meta[name="DC.Type.articleType"]').attr('content') || '';
    const excludedTypes = ['Recensiones', 'Fuentes y textos originales', 'Notas críticas', 'Reseñas'];
    
    if (excludedTypes.includes(articleType)) {
      throw new Error(`Tipo de artículo no válido: ${articleType}`);
    }
    
    // Extract metadata
    const titulo = $('meta[name="citation_title"]').attr('content') || '';
    const doi = $('meta[name="DC.Identifier.DOI"]').attr('content') || '';
    
    // Extract all authors and institutions
    const autores: string[] = [];
    const filiacion: string[] = [];
    
    // Find all meta tags with name="citation_author"
    $('meta[name="citation_author"]').each((_, element) => {
      const autor = $(element).attr('content');
      if (autor) autores.push(autor.trim());
    });
    
    // Find all meta tags with name="citation_author_institution"
    $('meta[name="citation_author_institution"]').each((_, element) => {
      const institucion = $(element).attr('content');
      if (institucion) filiacion.push(institucion.trim());
    });
    
    return {
      titulo,
      autores,
      numeroDeAutores: autores.length,
      filiacion,
      doi
    };
  } catch (error) {
    console.error('Error scraping article:', error);
    throw new Error(`Failed to scrape article: ${error instanceof Error ? error.message : String(error)}`);
  }
}

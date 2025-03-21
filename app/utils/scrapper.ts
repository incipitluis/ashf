import axios from 'axios';
import * as cheerio from 'cheerio';

interface JournalIssue {
  Año: string;
  Volumen: string;
  Número: string;
  Identificador: string;
  url: string;
}


export async function scrapJournalIssues({url, year}: {url: string, year: string}): Promise<JournalIssue[]> {
  console.log(`Starting to scrape journal issues from: ${url} for year: ${year}`);
  try {
   
    const response = await axios.get(url);
    const html = response.data;
    
    
    // Load HTML into cheerio
    const $ = cheerio.load(html);
   
    
    const issues: JournalIssue[] = [];
    
    // Find all anchor elements with class "title"
    
    const anchorElements = $('a.title');
   
    
    $('a.title').each((index, element) => {
      const $element = $(element);
      const href = $element.attr('href');
      let title = $element.text().trim();
      
      console.log(`Processing element ${index + 1}:`);
      console.log(`  - href: ${href}`);
      console.log(`  - title from anchor: ${title}`);
      
      // Check if there's a series div after the anchor
      const seriesDiv = $element.next('div.series');
      if (seriesDiv.length > 0) {
        const seriesText = seriesDiv.text().trim();
        console.log(`  - Found series div with text: ${seriesText}`);
        
        // If the title doesn't contain volume and number info, use the series text
        if (!title.includes('Vol.') && !title.includes('Núm.')) {
          console.log(`  - Using series text for volume/number/year information`);
          // We'll keep the anchor text as a description but use series for metadata
          const description = title;
          title = seriesText;
          console.log(`  - Description: ${description}`);
          console.log(`  - Using title from series: ${title}`);
        }
      }
      
      // Check if the href matches the expected pattern
      if (href && href.includes('https://revistas.ucm.es/index.php/ASHF/issue/view/')) {
      
        
        // Extract the identifier from the URL
        const urlParts = href.split('/');
        const identificador = urlParts[urlParts.length - 1];
        console.log(`  - Extracted identifier: ${identificador}`);
        
        // Parse the title to extract year, volume, and number
        let año = '';
        let volumen = '';
        let número = '';
        
        // Regular expression to match patterns like "Vol. 42 Núm. 1 (2025)"
        const regex = /Vol\.\s+(\d+)\s+Núm\.\s+(\d+|\w+).*?\(\s*(\d{4})\s*\)/i;
        const match = title.match(regex);
        
        if (match) {
          volumen = match[1];
          número = match[2];
          año = match[3];
          console.log(`  - Extracted from standard format: Año=${año}, Volumen=${volumen}, Número=${número}`);
        } else {
          console.log('  - Title does not match standard format, trying alternative parsing');
          // Handle special cases or alternate formats
          
          // Try to extract year from parentheses (allowing for spaces)
          const yearMatch = title.match(/\(\s*(\d{4})\s*\)/);
          if (yearMatch) {
            año = yearMatch[1];
            console.log(`  - Extracted year: ${año}`);
          }
          
          // Try to extract volume if it exists
          const volMatch = title.match(/Vol\.\s+(\d+)/i);
          if (volMatch) {
            volumen = volMatch[1];
            console.log(`  - Extracted volume: ${volumen}`);
          }
          
          // Try to extract number if it exists (including special text like "Especial")
          const numMatch = title.match(/Núm\.\s+(\d+|\w+)/i);
          if (numMatch) {
            número = numMatch[1];
            console.log(`  - Extracted number: ${número}`);
          }
        }
        
        console.log(`  - Final parsed data: Año=${año}, Volumen=${volumen}, Número=${número}`);
        
        // Only add the issue if it matches the requested year
        if (año === year) {
          console.log(`  - Year ${año} matches requested year ${year}, adding to results`);
          issues.push({
            Año: año,
            Volumen: volumen,
            Número: número,
            Identificador: identificador,
            url: href
          });
          console.log('  - Added issue to results array');
        } else {
          console.log(`  - Year ${año} does not match requested year ${year}, skipping`);
        }
      } else {
        console.log('  - URL pattern does not match expected format, skipping');
      }
    });
    
    console.log(`Finished processing. Found ${issues.length} journal issues for year ${year}`);
    return issues;
  } catch (error) {
    console.error('Error scraping journal issues:', error);
    throw new Error('Failed to scrape journal issues');
  }
}

export async function scrapJournalArticles(url: string): Promise<{ Nombre: string; articleIds: string[] }> {
  console.log(`Starting to scrape journal articles from: ${url}`);
  try {
    // Fetch the HTML content from the provided URL
    console.log('Fetching HTML content...');
    const response = await axios.get(url);
    const html = response.data;
    console.log('HTML content fetched successfully');
    
    // Load HTML into cheerio
    const $ = cheerio.load(html);
    console.log('HTML loaded into cheerio');
    
    // Extract the current issue title
    const currentIssueTitle = $('.current_issue_title').text().trim();
    console.log(`Found current issue title: "${currentIssueTitle}"`);
    
    // Find all article IDs from anchors with id attribute "article-[NUMERO]"
    console.log('Looking for anchors with article IDs...');
    const articleElements = $('a[id^="article-"]');
    console.log(`Found ${articleElements.length} article elements`);
    
    const articleIds: string[] = [];
    
    $('a[id^="article-"]').each((index, element) => {
      const id = $(element).attr('id');
      console.log(`Processing article element ${index + 1}:`);
      console.log(`  - Full ID: ${id}`);
      
      if (id) {
        // Extract just the number part after "article-"
        const idNumber = id.replace('article-', '');
        console.log(`  - Extracted ID number: ${idNumber}`);
        articleIds.push(idNumber);
      } else {
        console.log('  - No ID attribute found, skipping');
      }
    });

    console.log(`Finished processing. Found ${articleIds.length} article IDs`);
    console.log('Returning results:', { Nombre: currentIssueTitle, articleIds });
    
    return {
      Nombre: currentIssueTitle,
      articleIds: articleIds
    };
  } catch (error) {
    console.error('Error scraping journal articles:', error);
    throw new Error('Failed to scrape journal articles');
  }
}   
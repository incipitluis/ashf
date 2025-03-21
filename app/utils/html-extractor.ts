import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

/**
 * Extrae el HTML de una URL y lo guarda en un archivo
 * @param url La URL de la página web a extraer
 * @returns Objeto con el nombre del archivo y la ruta donde se guardó
 */
export async function extractHtmlFromUrl(url: string): Promise<{ filename: string, filepath: string }> {
  try {
    // Validar que la URL sea válida
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('URL inválida. Debe comenzar con http:// o https://');
    }

    // Crear directorio si no existe
    const htmlDir = path.join(process.cwd(), 'app/utils/html');
    if (!fs.existsSync(htmlDir)) {
      fs.mkdirSync(htmlDir, { recursive: true });
    }

    // Obtener el HTML de la URL
    const response = await axios.get(url);
    const html = response.data;

    // Generar nombre de archivo único basado en la URL y un UUID
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/\./g, '-');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${hostname}-${timestamp}-${uuidv4().slice(0, 8)}.html`;
    
    const filepath = path.join(htmlDir, filename);

    // Guardar el HTML en un archivo
    fs.writeFileSync(filepath, html);

    console.log(`HTML extraído y guardado en: ${filepath}`);
    return { filename, filepath };
  } catch (error) {
    console.error('Error al extraer HTML:', error);
    throw error;
  }
}

/**
 * Obtiene la lista de archivos HTML extraídos
 * @returns Array con los nombres de los archivos HTML
 */
export function getExtractedHtmlFiles(): string[] {
  const htmlDir = path.join(process.cwd(), 'app/utils/html');
  
  if (!fs.existsSync(htmlDir)) {
    return [];
  }
  
  return fs.readdirSync(htmlDir)
    .filter(file => file.endsWith('.html'));
}

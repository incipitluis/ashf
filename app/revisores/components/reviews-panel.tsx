"use client"

import { SelectAnalesReviews } from "@/db/schema"
import { useState } from "react";
import YearSelector from "./year-selector";
import { JournalSelector } from "./journal-selector";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ModeSelector } from "./mode-selector";
import { Issue } from "@/app/utils/scrapper";

export default function ReviewsPanel() {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReviewersLoading, setIsReviewersLoading] = useState<boolean>(false);
  const [scrapedData, setScrapedData] = useState<Issue[]>([]);
  const [mode, setMode] = useState<string>('solicitud');
  const [scrapYear, setScrapYear] = useState<string>('');
  const [reviewsFiltered, setReviewsFiltered] = useState<SelectAnalesReviews[]>([]);
  const [noReviewersIds, setNoReviewersIds] = useState<string[]>([]);
  const [journal, setJournal] = useState<string>('anales');
  const years = Array.from({length: 2030 - 2015}, (_, i) => (2015 + i).toString());
  
  

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const handleScrapYearChange = (year: string) => {
    setScrapYear(year);
    console.log(year);
  };

  
  const handleScrapJournal = async ({journal, year}: {journal: string, year: string}) => {
    if (!journal) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/scrap?journal=${journal}&year=${year}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Scraped data:', data);
      
      // Set the scraped data to state
      setScrapedData(data);
    } catch (error) {
      console.error('Error scraping journal:', error);
      alert('Error scraping journal. Check console for details.');
    } finally {
      setIsLoading(false);
      console.log(scrapedData);
    }
  };

    const allArticleIds = scrapedData.flatMap(issue => 
      issue.articleIds || []
    );
    
  
const handleGetReviewersByDate = async ({journal, year}: {journal: string, year: string}) => {
  setIsReviewersLoading(true);
  try {
    const response = await fetch(`/api/fecyt/solicitude?journal=${journal}&year=${year}`);
    const reviewers = await response.json();
    setReviewsFiltered(reviewers);
  } catch (error) {
    console.error('Error getting reviewers:', error);
  } finally {
    setIsReviewersLoading(false);
  }
}

  const handleGetReviewersByArticleIds = async ({journal, allArticleIds}: {journal: string, allArticleIds: string[]}) => {
    setIsReviewersLoading(true);
    try {
      const response = await fetch(`/api/fecyt?journal=${journal}&articleIds=${allArticleIds.join(',')}`);
      const reviewers = await response.json();
      setReviewsFiltered(reviewers.reviewers);
      setNoReviewersIds(reviewers.noReviewersIds);
    } catch (error) {
      console.error('Error getting reviewers:', error);
    } finally {
      setIsReviewersLoading(false);
    }
   }


  return (
    <div className="bg-white rounded-lg shadow-md p-24 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Reviews Dashboard</h1>
      <div>
        <ModeSelector setMode={setMode} />
      </div>
      {mode === 'solicitud' && (
        <div className="flex flex-col md:flex-row gap-4 my-6">
          <div className="w-full md:w-1/2">
            <JournalSelector journal={journal} setJournal={setJournal} />
        </div>
        <div className="w-full md:w-1/2">
          <YearSelector years={years} onYearChange={handleYearChange} />
        </div>
        <Button
          className=""
          onClick={() => handleGetReviewersByDate({journal, year: selectedYear})}
          disabled={isReviewersLoading}
        >
          {isReviewersLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get Reviewers'}
        </Button>
      </div>
      )}

      {mode === 'articulos' && (
        <div className="flex flex-col my-3 justify-center items-center">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <JournalSelector journal={journal} setJournal={setJournal} />
          </div>
          <div className="w-full md:w-1/2">
            <YearSelector years={years} onYearChange={handleScrapYearChange} />
          </div>

        <Button
          className=""
          onClick={() => handleScrapJournal({journal, year: scrapYear})}
          disabled={isLoading}
         >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get the Ids'}
        </Button>
        </div>
        <p className="text-sm text-gray-500">Selecciona una revista y un año para obtener los artículos publicados en ese año</p>
        </div>
      )}

      {scrapedData.length > 0 && (
       <div className="my-6">
       <div className="flex flex-col gap-2 mb-2 overflow-x-auto">
          <h4>Resultado del scrapping</h4>
         {scrapedData.map((issue, index) => (
          <div key={index} className="flex flex-col gap-2 mb-2">
            <p>{issue.Nombre}</p>
            <div className="flex flex-row gap-2">
              {issue.articleIds.map((articleId, index) => (
                <p key={index}>{articleId}, </p>
              ))}
            </div>
          </div>
         ))}
       </div>
       <div>

       </div>
        <div className="flex gap-4">
          <Button onClick={() => handleGetReviewersByArticleIds({journal, allArticleIds})} disabled={isReviewersLoading}> 
            {isReviewersLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get Reviewers'}
          </Button>
          <Button onClick={() => {
            const csvContent = [
              'Issue,Ids',
              ...scrapedData.map(issue => 
                `"${issue.Nombre}",${issue.articleIds.join(';')}`
              )
            ].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `scraped_data_${journal}_${scrapYear}.csv`;
            link.click();
          }}>
            Download CSV
          </Button>
        </div>
        </div>
      )}
      
      
      {reviewsFiltered.length > 0 ? (
        <>
        {noReviewersIds.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-red-500/60">Algunos Id de Artículo no se corresponden con revisores del excel, chequea la consola</p>
          </div>
        )}
        <div className="flex justify-end items-center mb-4 gap-8">
        <p className="text-sm text-gray-500">Total de reviews: {reviewsFiltered.length}</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => {
                const reviewDetails = reviewsFiltered.map((review, index) => 
                  `${index + 1}) Revisor: ${review.revisorNombre} ${review.revisorApellidos}, Título Envío: ${review.tituloEnvio}, ID Envío: ${review.idEnvio}\nFecha Envío: ${review.fechaCompletada?.split(' ')[0]}, Recomendación: ${review.recomendacion}`
                ).join('\n');
                navigator.clipboard.writeText(reviewDetails);
                alert('Gracias por usar el servicio postpunk de extracción de estadísticas de ASHF');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy Review Details
            </button>
          </div>
          <div className="grid gap-4 mb-6">
            {reviewsFiltered.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Revisor</p>
                    <p className="font-medium text-gray-800">{review.revisorNombre} {review.revisorApellidos}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Título Envío</p>
                    <p className="font-medium text-gray-800">{review.tituloEnvio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID Envío</p>
                    <p className="font-medium text-gray-800">{review.idEnvio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600"></p>
        </div>
      )}
    </div>
  )
}
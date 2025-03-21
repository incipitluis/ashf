"use client"

import { SelectAnalesReviews, SelectArticlesAnales } from "@/db/schema"
import StateSelector from "./state-selector"
import { useEffect, useState } from "react";
import YearSelector from "./year-selector";
import { getRevisores } from "../data";

export default function ReviewsPanel({articles}: {articles: SelectArticlesAnales[] | undefined}){
  const [selectedState, setSelectedState] = useState<string>('Aceptado');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [reviews, setReviews] = useState<SelectAnalesReviews[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<SelectArticlesAnales[]>([]);
  const [reviewsFiltered, setReviewsFiltered] = useState<SelectAnalesReviews[]>([]);
  const years = Array.from({length: 2030 - 2015}, (_, i) => (2015 + i).toString());
  
  
  const handleStateChange = (state: string) => {
    setSelectedState(state);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getRevisores(selectedYear);
      setReviews(reviews);
    };
    fetchReviews();
  }, [selectedYear]);

  useEffect(() => {
    if (selectedState === "Rechazado"){
      setFilteredArticles(articles?.filter(article => article.estado === "Rechazado") || []);
    } else {
      setFilteredArticles(articles?.filter(article => article.estado !== "Rechazado") || []);
    }
  }, [selectedState, articles]);

  useEffect(() => {
    const reviewsFiltered = reviews.filter(review => filteredArticles.some(article => article.idEnvio === review.idEnvio));
    setReviewsFiltered(reviewsFiltered);
  }, [filteredArticles, reviews]);

  

  return (
    <div className="bg-white rounded-lg shadow-md p-24 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Reviews Dashboard</h1>
      
      <div className="flex flex-col md:flex-row gap-4 my-6">
        <div className="w-full md:w-1/2">
          <StateSelector onSelectState={handleStateChange} />
        </div>
        <div className="w-full md:w-1/2">
          <YearSelector years={years} onYearChange={handleYearChange} />
        </div>
      </div>
      
      {reviewsFiltered.length > 0 ? (
        <>
        <div className="flex justify-end items-center mb-4 gap-8">
        <p className="text-sm text-gray-500">Total de reviews: {reviewsFiltered.length}</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => {
                const reviewDetails = reviewsFiltered.map((review, index) => 
                  `${index + 1}) Revisor: ${review.revisorNombre} ${review.revisorApellidos}, Título Envío: ${review.tituloEnvio}, ID Envío: ${review.idEnvio}\nFecha Envío: ${review.fechaCompletada?.split(' ')[0]}, Recomendación: ${review.recomendacion}, Estado del artículo: ${selectedState}`
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
          <p className="text-gray-600">No reviews found for the selected criteria.</p>
        </div>
      )}
    </div>
  )
}
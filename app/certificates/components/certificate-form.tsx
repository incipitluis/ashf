"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { createCertificate } from "../../utils/create-certificate";
import { Certificate } from "./certificate";

import { getArticlesForCheck } from "../data";
import { updateArticleStatus } from "../actions";
import { SearchTool } from "./search-tool";

type CertificateData = {
  autor: string;
  titulo: string;
  year: string;
};

export function CertificateForm() {
  const [showDownload, setShowDownload] = useState(false);
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [autor, setAutor] = useState("");
  const [titulo, setTitulo] = useState("");
  const [year, setYear] = useState("");
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleSearch = (
    id: string,
    titulo: string,
    year: string,
    autor: string
  ) => {
    setId(id);
    setAutor(autor);
    setTitulo(titulo);
    setYear(year);
    setShowCard(true);
  };

  const handleClick = async () => {
    if (!certificateRef.current) {
      return;
    }

    const autorElement = certificateRef.current.querySelector(
      '[data-field="autor"]'
    );
    const tituloElement = certificateRef.current.querySelector(
      '[data-field="titulo"]'
    );
    const yearElement = certificateRef.current.querySelector(
      '[data-field="year"]'
    );

    if (!autorElement || !tituloElement || !yearElement) {
      return;
    }

    const autor = autorElement.textContent || "";
    const titulo = tituloElement.textContent || "";
    const year = yearElement.textContent || "0";

    const data = await getArticlesForCheck(autor, titulo, year);

    if (data.length === 0) {
      alert("El artículo no existe en la base de datos");
      return;
    }
    setIsChecked(true);
    await createCertificate(certificateRef.current);
    await updateArticleStatus(data[0].id);
  };

  async function handleSubmit(autor: string, titulo: string, year: string) {
    if (!year || !autor || !titulo) {
      alert("No ha seleccionado ningún artículo");
      return;
    }
    setIsLoading(true);
    const data = await getArticlesForCheck(autor, titulo, year);

    if (data.length > 0) {
      const id = data[0].id;
      setCertificateData({ autor, titulo, year });
      setShowDownload(true);
      setId(id);
      setIsLoading(false);
    } else {
      alert("El artículo no existe en la base de datos");
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Anales del Seminario de Historia de la Filosofía
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              Solicitud de Certificado de Aceptación
            </h1>
            <p className="my-1 text-sm text-gray-500">
              Busque el título de su artículo en nuestra base de datos
            </p>
            <div className="my-4">
              <SearchTool onSelect={handleSearch} />
            </div>
            {showCard && (
              <div className="my-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Detalles del Artículo
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium w-24">
                        Título:
                      </span>
                      <p className="text-gray-900 flex-1">{titulo || "—"}</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium w-24">
                        Autor:
                      </span>
                      <p className="text-gray-900 flex-1">{autor || "—"}</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium w-24">
                        Año:
                      </span>
                      <p className="text-gray-900 flex-1">{year || "—"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Button
              onClick={() => handleSubmit(autor, titulo, year)}
              className="w-full"
            >
              {isLoading ? "Verificando..." : "Solicitar Certificado"}
            </Button>
          </div>
        </div>
      </div>
      {showDownload && certificateData && id && (
        <div className="mt-4 flex flex-col items-center">
          <Button onClick={() => handleClick()} className="my-4">
            Descargar Certificado
          </Button>

          <Certificate
            articulo={certificateData.titulo}
            autor={certificateData.autor}
            year={certificateData.year}
            certificateRef={certificateRef}
            isChecked={isChecked}
          />
        </div>
      )}
    </>
  );
}

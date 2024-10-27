"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCertificate } from "../../utils/create-certificate";
import { Certificate } from "./certificate";

import { SelectArticle } from "@/db/schema";
import { getArticles } from "../data";
import { updateArticleStatus } from "../actions";

const formSchema = z.object({
  autor: z.string().min(2, {
    message: "El nombre del autor debe tener al menos 2 caracteres.",
  }),
  titulo: z.string().min(5, {
    message: "El título debe tener al menos 5 caracteres.",
  }),
  year: z.string().regex(/^\d{4}$/, {
    message: "El año debe ser un número de 4 dígitos.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function CertificateForm() {
  const [showDownload, setShowDownload] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  console.log("Rendering CertificateForm"); // Debug log

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      autor: "",
      titulo: "",
      year: "",
    },
  });

  async function checkExistingArticle(data: SelectArticle[]) {
    if (data.length > 0) {
      return true;
    }
    return false;
  }

  const handleClick = async () => {
    console.log("handleClick iniciado");

    if (!certificateRef.current) {
      console.log("certificateRef.current es null");
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

    console.log("Elementos encontrados:", {
      autorElement,
      tituloElement,
      yearElement,
    });

    if (!autorElement || !tituloElement || !yearElement) {
      console.log("Uno o más elementos no fueron encontrados");
      return;
    }

    const autor = autorElement.textContent || "";
    const titulo = tituloElement.textContent || "";
    const year = parseInt(yearElement.textContent || "0", 10);

    console.log("Datos extraídos del DOM:", { autor, titulo, year });

    const data = await getArticles(autor, titulo, year);
    console.log("Datos obtenidos de getData:", data);

    const isExistingArticle = await checkExistingArticle(data);
    console.log("¿El artículo existe?", isExistingArticle);

    if (!isExistingArticle) {
      console.log("El artículo no existe en la base de datos");
      alert("El artículo no existe en la base de datos");
      return;
    }
    setIsChecked(true);
    console.log("Iniciando creación del certificado");
    await createCertificate(certificateRef.current);
    console.log("Certificado creado");

    console.log("Actualizando estado del artículo");
    await updateArticleStatus(data[0].id);
    console.log("Estado del artículo actualizado");

    console.log("handleClick completado");
  };

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    console.log("onSubmit iniciado con valores:", values);

    const data = await getArticles(
      values.autor,
      values.titulo,
      parseInt(values.year)
    );
    console.log("Datos obtenidos de getData:", data);

    const existingArticle = await checkExistingArticle(data);
    console.log("¿El artículo existe?", existingArticle);

    if (existingArticle) {
      const id = data[0].id;
      console.log("ID del artículo encontrado:", id);
      setFormData(values);
      setShowDownload(true);
      setId(id);
      setIsLoading(false);
      console.log("Estado actualizado: formData, showDownload, id");
    } else {
      console.log("El artículo no existe en la base de datos");
      alert("El artículo no existe en la base de datos");
      setIsLoading(false);
    }

    console.log("onSubmit completado");
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Anales del Seminario de Historia de la Filosofía
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              Solicitud de Certificado de Aceptación
            </h1>
            <p className="mt-2 text-gray-500">
              Complete el formulario para solicitar su certificado de aceptación
              de artículo. Nombre, apellidos y título han de coincidir con los
              proporcionados en OJS.
            </p>
            <div className="mt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="autor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Autor</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej. María García" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título del Artículo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. La filosofía en el siglo XXI"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Año de Publicación</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej. 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    {isLoading ? "Verificando..." : "Solicitar Certificado"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {showDownload && formData && id && (
        <div className="mt-4 flex flex-col items-center">
          <Button onClick={() => handleClick()} className="my-4">
            Descargar Certificado
          </Button>

          <Certificate
            articulo={formData.titulo}
            autor={formData.autor}
            year={formData.year}
            certificateRef={certificateRef}
            isChecked={isChecked}
          />
        </div>
      )}
    </>
  );
}

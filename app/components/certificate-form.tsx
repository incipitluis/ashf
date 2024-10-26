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
import { createCertificate } from "../utils/create-certificate";
import { Certificate } from "./certificate";

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

  const handleClick = async () => {
    if (certificateRef.current) {
      await createCertificate(certificateRef.current);
    }
  };

  function onSubmit(values: FormData) {
    console.log("Form submitted with values:", values); // Debug log
    setFormData(values);
    setShowDownload(true);
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
              de artículo.
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
                    Solicitar Certificado
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {showDownload && formData && (
        <div className="mt-4 flex flex-col items-center">
          <Button onClick={handleClick} className="my-4">
            Descargar Certificado
          </Button>

          <Certificate
            articulo={formData.titulo}
            autor={formData.autor}
            year={formData.year}
            certificateRef={certificateRef}
          />
        </div>
      )}
    </>
  );
}

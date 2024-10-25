"use client";

import { useState } from "react";
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

  console.log("Rendering CertificateForm"); // Debug log

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      autor: "",
      titulo: "",
      year: "",
    },
  });

  function onSubmit(values: FormData) {
    console.log("Form submitted with values:", values); // Debug log
    setFormData(values);
    setShowDownload(true);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
      {showDownload && formData && (
        <div className="mt-4">
          <a
            href={`/api/generate-pdf?nombre=${encodeURIComponent(
              formData.autor
            )}&articulo=${encodeURIComponent(
              formData.titulo
            )}&year=${encodeURIComponent(formData.year)}`}
            onClick={() => console.log("Download link clicked")} // Debug log
          >
            <Button>Descargar Certificado</Button>
          </a>
        </div>
      )}
    </>
  );
}

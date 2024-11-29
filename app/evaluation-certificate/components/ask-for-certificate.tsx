"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createSolicitudCertificadoRevision } from "../actions"
import { useState, useTransition } from "react"

const formSchema = z.object({
  reviewerName: z.string().min(2, {
    message: "Reviewer name must be at least 2 characters.",
  }),
  articleReviewed: z.string().min(2, {
    message: "Article name must be at least 2 characters.",
  }),
  year: z.string().min(4, {
    message: "Please enter a valid year.",
  }),
})

export function AskForCertificate() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reviewerName: "",
      articleReviewed: "",
      year: "",
    },
  })

  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(values.reviewerName && values.articleReviewed && values.year){
      startTransition(async () => {
        await createSolicitudCertificadoRevision(values.reviewerName, values.articleReviewed, values.year);
        setIsSuccess(true);
      });
    }
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
            Solicitud de Certificado de Revisión
          </h1>
          <p className="mt-2 text-gray-500">
            Complete el formulario para solicitar un certificado de revisión.
          </p>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
          control={form.control}
          name="reviewerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reviewer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter reviewer name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the full name of the reviewer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="articleReviewed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article Reviewed</FormLabel>
              <FormControl>
                <Input placeholder="Enter article title" {...field} />
              </FormControl>
              <FormDescription>
                Enter the title of the reviewed article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="YYYY" {...field} />
              </FormControl>
              <FormDescription>
                Enter the year when the review was conducted.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<Button
                    type="submit"
                    className={`w-full ${isSuccess ? "bg-green-500" : ""} ${
                      isLoading ? "disabled opacity-50" : ""
                    }`}
                  >
                    {isLoading
                      ? "Solicitando..."
                      : isSuccess
                      ? "Certificado solicitado correctamente"
                      : "Solicitar"}
                  </Button>
            </form>
          </Form>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
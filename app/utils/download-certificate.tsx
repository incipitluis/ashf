"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import CertificatePDF from "./create-certificate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DownloadCertificate({
  nombre,
  articulo,
  year,
}: {
  nombre: string;
  articulo: string;
  year: number;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <PDFDownloadLink
        document={
          <CertificatePDF nombre={nombre} articulo={articulo} year={year} />
        }
        fileName="certificado.pdf"
      >
        <Button onClick={() => setLoading(true)}>
          {loading ? "Generando documento..." : "Descargar Certificado"}
        </Button>
      </PDFDownloadLink>
    </div>
  );
}

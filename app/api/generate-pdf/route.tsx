import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import CertificatePDF from "@/app/utils/create-certificate";
import React from "react";

export async function GET(request: NextRequest) {
  console.log("GET request received in generate-pdf route"); // Debug log

  const { searchParams } = new URL(request.url);
  const nombre = searchParams.get("nombre") || "";
  const articulo = searchParams.get("articulo") || "";
  const year = parseInt(searchParams.get("year") || "0", 10);

  console.log("Received params:", { nombre, articulo, year }); // Debug log

  try {
    console.log("Attempting to render PDF");
    const pdfBuffer = await renderToBuffer(
      <React.Fragment>
        <CertificatePDF nombre={nombre} articulo={articulo} year={year} />
      </React.Fragment>
    );
    console.log("PDF rendered successfully"); // Debug log

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="certificado.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error); // Error log
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return new NextResponse("Error generating PDF", { status: 500 });
  }
}

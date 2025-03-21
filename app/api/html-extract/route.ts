import { NextRequest, NextResponse } from "next/server";
import { extractHtmlFromUrl } from "@/app/utils/html-extractor";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const { filename, filepath } = await extractHtmlFromUrl(url);
    return NextResponse.json({ filename, filepath });
  } catch (error) {
    console.error("Error al extraer HTML:", error);
    return NextResponse.json(
      { error: "Error al extraer HTML" },
      { status: 500 }
    );
  }
}

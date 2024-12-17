import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anales del Seminario de Historia de la Filosofía",
  description: "This is a blog and a website for the Anales del Seminario de Historia de la Filosofía peer reviewed journal. It is a journal of the Universidad Complutense de Madrid. The place is intended for management purposes and divulgation of our latest news.",
  keywords: ["Anales del Seminario de Historia de la Filosofía",
     "UCM",
     "Universidad Complutense de Madrid",
      "Historia de la Filosofía",
      "Divulgation", 
      "Latest News",
      "AI",
      "Artificial Intelligence",
      "Blog",
      "Website",
      "Management", 
      "Divulgation", 
      "Latest News",
      "Philosophy",
      "Filosofía",
      "Kant",
      "Hegel",
      "Nietzsche",
      "Wittgenstein",
      "Heidegger",
      "Aristotle",
      "Plato",
      "Socrates",
      "Descartes",
      "Kant",
      "Hegel",
      "Nietzsche",
        ],
      robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}

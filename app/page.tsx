import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Link href="/certificates">Certificados</Link>
      <Link href="/admin">Administración</Link>
    </div>
  );
}

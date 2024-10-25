import { CertificateForm } from "./components/certificate-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
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
              <CertificateForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

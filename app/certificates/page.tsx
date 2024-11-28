import { CertificateForm } from "./components/certificate-form";

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-28 px-4 sm:px-6 lg:px-8">
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 max-w-sm">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <h3 className="font-medium text-gray-900">
                Sistema de Certificados
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Esta es una prueba de concepto de página para descarga de
              certificados. Se compone de un buscador que busca en la base de
              datos mientras se escribe, una card con una previsualización de
              los datos del artículo seleccionado y botones de solicitar y
              descargar certificados.
            </p>

            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-semibold text-gray-700">
                Protecciones:
              </h4>
              <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                <li>
                  Sólo genera certificados con información existente en la base
                  de datos
                </li>
                <li>
                  Doble verificación servidor-cliente antes de la descarga
                </li>
                <li>Marca de agua en previsualización web</li>
              </ul>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Certificados Seguros
              </div>
            </div>
          </div>
        </div>
      </div>
      <CertificateForm />
    </div>
  );
}

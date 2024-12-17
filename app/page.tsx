import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const functionalities = [
  {
    title: "Certificados de aceptación",
    description:
      "Solicite certificados oficiales para artículos aceptados en la revista.",
    tooltip:
      "Se compone de un buscador que busca en la base de datos mientras se escribe,\n" +
      "una card con una previsualización de los datos del artículo seleccionado\n" +
      "y botones de solicitar y descargar certificados.\n\n" +
      "Incorpora double check en servidor para evitar fraudes,\n" +
      "y previsualización con marca de agua del certificado.",
    link: "/certificados",
  },
  {
    title: "Certificados de revisión",
    description: "Gestione certificados para revisores de artículos.",
    tooltip: "Se compone de un formulario mediante el cual lxs revisorxs pueden solicitar certificados para los artículos que han revisado. ",
    link: "/certificados",
  },
  {
    title: "Gestión de base de datos",
    description:
      "Acceso y gestión de la base de datos de artículos publicados y revisiones.",
    tooltip:
      "El admin panel está conectado a una base de datos Neon Postgres.\n" +
      "Se ha montado un servidor de Django para incorporar Python en el manejo de los pdf\n" +
      "Se le han diseñado botones responsivos y permite la creación\n" +
      "de nuevos artículos en la base de datos. \n" +
      "Se añade finalmente un panel de gestión de certificados de revisión.",
    link: "/certificados",
  },
  {
    title: "Blog informativo",
    description:
      "Manténgase al día con las últimas noticias y actualizaciones de ASHF.",
    tooltip: "El blog está implementado con Next.js y Tailwind CSS. \n" +
    "Se ha utilizado la API de OpenAI para la generación de artículos y la optimización para SEO. \n" +
    "Dispone de un cronjob para la publicación automática de artículos.",
    link: "/blog",
  },
];

const formatTooltip = (tooltip: string) => {
  return tooltip.split("\n").map((line, index) => (
    <p key={index} className="text-sm text-gray-600 leading-relaxed">
      {line}
    </p>
  ));
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 pt-20">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Anales del Seminario de Historia de la Filosofía
          </h1>
          <p className="text-xl text-slate-600">Portal de gestión y servicios</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 border border-slate-200">
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Bienvenido al portal de gestión de Anales del Seminario de Historia
            de la Filosofía. Este espacio está diseñado para facilitar diversos
            procesos administrativos y de gestión relacionados con la revista.
          </p>

          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-8">
            <p className="text-indigo-700">
              Este portal se encuentra en desarrollo activo, implementando
              nuevas funcionalidades para mejorar la experiencia de nuestros
              colaboradores.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Funcionalidades en desarrollo
            </h2>
            <TooltipProvider>
              <ul className="space-y-4">
                {functionalities.map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <li className="flex flex-col sm:flex-row items-start bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors duration-200 border border-slate-200">
                        <div className="flex-shrink-0 mb-2 sm:mb-0">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-sm">
                            {index + 1}
                          </div>
                        </div>
                        <div className="ml-4">
                          <Link href={item.link}>
                            <h3 className="text-lg font-medium text-slate-800">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="mt-1 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-white/90 backdrop-blur-sm shadow-lg text-sm text-slate-600 border border-slate-200">
                      {formatTooltip(item.tooltip)}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </ul>
            </TooltipProvider>
          </div>
        </div>

        <div className="text-center text-slate-600 text-sm">
          <p>
            Para cualquier consulta, contacte con el equipo editorial de ASHF
          </p>
        </div>
      </div>
    </div>
  );
}

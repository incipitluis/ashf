const functionalities = [
  {
    title: "Certificados de aceptación",
    description:
      "Solicite certificados oficiales para artículos aceptados en la revista.",
  },
  {
    title: "Certificados de revisión",
    description: "Gestione certificados para revisores de artículos.",
  },
  {
    title: "Gestión de base de datos",
    description:
      "Acceso y gestión de la base de datos de artículos publicados.",
  },
  {
    title: "Estadísticas",
    description: "Visualización de datos y métricas relevantes de la revista.",
  },
  {
    title: "Blog informativo",
    description:
      "Manténgase al día con las últimas noticias y actualizaciones de ASHF.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Anales del Seminario de Historia de la Filosofía
          </h1>
          <p className="text-xl text-gray-600">Portal de gestión y servicios</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Bienvenido al portal de gestión de Anales del Seminario de Historia
            de la Filosofía. Este espacio está diseñado para facilitar diversos
            procesos administrativos y de gestión relacionados con la revista.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-blue-700">
              Este portal se encuentra en desarrollo activo, implementando
              nuevas funcionalidades para mejorar la experiencia de nuestros
              colaboradores.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Funcionalidades en desarrollo
            </h2>
            <ul className="space-y-4">
              {functionalities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
                      {index + 1}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm">
          <p>
            Para cualquier consulta, contacte con el equipo editorial de ASHF
          </p>
        </div>
      </div>
    </div>
  );
}

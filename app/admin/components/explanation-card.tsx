export function ExplanationCard() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <h3 className="font-medium text-gray-900">Panel de Administración</h3>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Este es el panel de administración. Está conectado a una base de datos
          Neon Postgres. Se ha estilado mínimamente para que el botón muestre el
          estado de la carga.
        </p>

        <div className="pt-2">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Neon Postgres
          </div>
        </div>
      </div>
    </div>
  );
}

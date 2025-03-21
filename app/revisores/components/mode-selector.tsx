export const ModeSelector = ({mode, setMode}: {mode: string, setMode: (mode: string) => void}) => {
  return (
    <div className="mb-6">
      <select className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700" onChange={(e) => setMode(e.target.value)}>
        <option value="solicitud">Buscar por fecha de solicitud de revisión</option>
        <option value="articulos">Buscar por artículos publicados</option>
      </select>
    </div>
  )
}
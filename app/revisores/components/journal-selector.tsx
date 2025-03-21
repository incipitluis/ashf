'use client'


export const JournalSelector = ({journal, setJournal}: {journal: string, setJournal: (journal: string) => void}) => {
  return (
    <div className="mb-6">
      <select 
        value={journal} 
        onChange={(e) => setJournal(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
      >
        <option value="anales">Anales</option>
        <option value="rpub">Res Publica</option>
        <option value="ltdl">Las Torres de Lucca</option>
      </select>
    </div>
  )
}
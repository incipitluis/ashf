import { useState } from 'react';

interface StateSelectorProps {
  onSelectState: (state: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({ onSelectState }) => {
  const [selectedState, setSelectedState] = useState<string>('Publicado');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = event.target.value;
    setSelectedState(newState);
    onSelectState(newState);
  };

  return (
    <div className="flex flex-col space-y-2">
      <select 
        id="state-selector" 
        value={selectedState} 
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="Aceptado">Aceptado</option>
        <option value="Rechazado">Rechazado</option>
      </select>
    </div>
  );
};

export default StateSelector;

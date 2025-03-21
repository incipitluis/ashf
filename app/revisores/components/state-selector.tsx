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
    <div>
      <label htmlFor="state-selector">Select State: </label>
      <select id="state-selector" value={selectedState} onChange={handleChange}>
        <option value="Publicado">Publicado</option>
        <option value="Rechazado">Rechazado</option>
      </select>
    </div>
  );
};

export default StateSelector;

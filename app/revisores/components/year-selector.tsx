import { useState } from "react";

interface YearSelectorProps {
  years: string[];
  onYearChange: (year: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ years, onYearChange }) => {
  const [selectedYear, setSelectedYear] = useState<string>(years[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    onYearChange(newYear);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <select
        id="year-selector"
        value={selectedYear}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;


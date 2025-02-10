import { useState } from "react";

interface SelectProps {
  value?: string;
  options: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Select({
  value,
  options,
  label,
  placeholder = "Choose...",
  onChange,
  className = "",
}: SelectProps) {
  const [selected, setSelected] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className={`w-64 ${className}`}>
      {label && (
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
      )}
      <div className="relative">
        <select
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          value={selected}
          onChange={handleChange}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

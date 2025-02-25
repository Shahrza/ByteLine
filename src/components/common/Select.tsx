import { useState } from "react";

interface SelectProps {
  value?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: boolean;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export default function Select({
  value,
  options,
  label,
  placeholder = "Choose...",
  className = "",
  defaultValue = true,
  onChange,
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
        <label className="block text-gray-700 font-medium mb-1 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          value={selected}
          onChange={handleChange}
        >
          {defaultValue && <option value="">{placeholder}</option>}
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

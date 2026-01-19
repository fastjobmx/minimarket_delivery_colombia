"use client";

interface SortOptionsProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export default function SortOptions({ sortBy, onSortChange }: SortOptionsProps) {
  const options = [
    { value: "popular", label: "Más populares" },
    { value: "price-low", label: "Precio: Menor a mayor" },
    { value: "price-high", label: "Precio: Mayor a menor" },
    { value: "rating", label: "Mejor calificados" },
    { value: "name", label: "Nombre A-Z" }
  ];

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
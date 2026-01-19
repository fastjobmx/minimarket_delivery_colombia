"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Categorías</h3>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              w-full text-left px-3 py-2 rounded-lg transition-colors
              ${selectedCategory === category
                ? 'bg-yellow-400 text-gray-900 font-medium' :'text-gray-700 hover:bg-gray-100'}
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
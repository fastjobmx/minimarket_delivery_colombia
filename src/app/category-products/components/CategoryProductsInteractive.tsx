"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import SortOptions from "./SortOptions";
import ViewToggle from "./ViewToggle";
import FloatingCart from "@/components/common/FloatingCart";
import CustomerBottomNav from "@/components/common/CustomerBottomNav";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  alt: string;
  category: string;
  subcategory?: string;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badges?: string[];
}

export default function CategoryProductsInteractive() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "Todos";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const mockProducts: Product[] = [
  {
    id: "1",
    name: "Arroz Diana Premium",
    description: "Arroz de primera calidad, 5kg",
    price: 18900,
    originalPrice: 22000,
    discount: 14,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb408d90-1768397864384.png",
    alt: "Paquete de arroz Diana Premium de 5kg",
    category: "Granos",
    subcategory: "Arroz",
    brand: "Diana",
    stock: 45,
    rating: 4.7,
    reviewCount: 234,
    badges: ["Oferta", "Más vendido"]
  },
  {
    id: "2",
    name: "Aceite Girasol Premier",
    description: "Aceite de girasol 100% puro, 3L",
    price: 24500,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_107d5b269-1768397863757.png",
    alt: "Botella de aceite de girasol Premier de 3 litros",
    category: "Despensa",
    subcategory: "Aceites",
    brand: "Premier",
    stock: 28,
    rating: 4.5,
    reviewCount: 156
  },
  {
    id: "3",
    name: "Panela San José",
    description: "Panela redonda tradicional, 500g",
    price: 3200,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1758e3d85-1768397864406.png",
    alt: "Panela redonda San José de 500 gramos",
    category: "Despensa",
    subcategory: "Endulzantes",
    brand: "San José",
    stock: 67,
    rating: 4.8,
    reviewCount: 89,
    badges: ["Producto local"]
  },
  {
    id: "4",
    name: "Chocolate Corona",
    description: "Chocolate de mesa, tableta 500g",
    price: 8900,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14b385f04-1768397863511.png",
    alt: "Tableta de chocolate Corona de 500 gramos",
    category: "Dulces",
    subcategory: "Chocolates",
    brand: "Corona",
    stock: 52,
    rating: 4.9,
    reviewCount: 312,
    badges: ["Favorito"]
  },
  {
    id: "5",
    name: "Café Juan Valdez Premium",
    description: "Café molido 500g, origen colombiano",
    price: 19800,
    originalPrice: 23000,
    discount: 14,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_142627219-1768397866612.png",
    alt: "Paquete de café molido Juan Valdez Premium de 500g",
    category: "Bebidas",
    subcategory: "Café",
    brand: "Juan Valdez",
    stock: 34,
    rating: 4.9,
    reviewCount: 445,
    badges: ["Premium", "Oferta"]
  },
  {
    id: "6",
    name: "Arepa de Maíz Pelao",
    description: "Arepa antioqueña, paquete 10 unidades",
    price: 6500,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_191be098e-1768397867627.png",
    alt: "Paquete de 10 arepas de maíz pelao antioqueñas",
    category: "Panadería",
    subcategory: "Arepas",
    brand: "Tradición",
    stock: 89,
    rating: 4.6,
    reviewCount: 178,
    badges: ["Producto local"]
  },
  {
    id: "7",
    name: "Leche Alpina Entera",
    description: "Leche entera pasteurizada, 1L",
    price: 3800,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1400feab8-1767903763500.png",
    alt: "Caja de leche Alpina entera de 1 litro",
    category: "Lácteos",
    subcategory: "Leches",
    brand: "Alpina",
    stock: 45,
    rating: 4.7,
    reviewCount: 267
  },
  {
    id: "8",
    name: "Huevos AA Kikes",
    description: "Huevos frescos, cubeta 30 unidades",
    price: 18500,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d168804c-1768397863744.png",
    alt: "Cubeta de 30 huevos frescos Kikes tamaño AA",
    category: "Lácteos",
    subcategory: "Huevos",
    brand: "Kikes",
    stock: 23,
    rating: 4.8,
    reviewCount: 134,
    badges: ["Frescos hoy"]
  }];


  const categories = [
  "Todos",
  "Granos",
  "Despensa",
  "Bebidas",
  "Lácteos",
  "Panadería",
  "Dulces",
  "Carnes",
  "Frutas y Verduras"];


  const brands = [...new Set(mockProducts.map((p) => p.brand))];

  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    let result = mockProducts;

    // Filter by category
    if (selectedCategory !== "Todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popular
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredProducts(result);
  }, [selectedCategory, sortBy, priceRange, selectedBrands]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
    prev.includes(brand) ?
    prev.filter((b) => b !== brand) :
    [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("Todos");
    setPriceRange([0, 500000]);
    setSelectedBrands([]);
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "Todos" ? "Todos los productos" : selectedCategory}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length} productos disponibles
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium">

              {showFilters ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
              Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`
            ${showFilters ? 'block' : 'hidden'} lg:block
            fixed lg:sticky top-0 left-0 right-0 lg:top-20 h-screen lg:h-auto
            bg-white lg:bg-transparent z-30 lg:z-0
            overflow-y-auto lg:overflow-visible
            lg:w-64 flex-shrink-0
          `}>
            <div className="lg:bg-white lg:rounded-lg lg:shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium">

                  Limpiar todo
                </button>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory} />


              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Rango de precio</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full" />

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span className="font-medium text-gray-900">
                      ${priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Marcas</h3>
                <div className="space-y-2">
                  {brands.map((brand) =>
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400" />

                      <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ?
            <div className={`
                ${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              `}>
                {filteredProducts.map((product) =>
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode} />

              )}
              </div> :

            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron productos</p>
                <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium">

                  Limpiar filtros
                </button>
              </div>
            }
          </div>
        </div>
      </div>

      <FloatingCart />
      <CustomerBottomNav />
    </div>);

}
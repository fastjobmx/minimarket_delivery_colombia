"use client";

import { useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { StarIcon, ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";

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
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badges?: string[];
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Added ${quantity}x ${product.name} to cart`);
  };

  if (viewMode === "list") {
    return (
      <Link href={`/product-details?id=${product.id}`}>
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 flex gap-4">
          <div className="relative w-32 h-32 flex-shrink-0">
            <AppImage
              src={product.image}
              alt={product.alt}
              fill
              className="object-cover rounded-lg"
            />
            {product.discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsFavorite(!isFavorite);
                }}
                className="p-2"
              >
                {isFavorite ? (
                  <HeartIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartOutlineIcon className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {product.stock > 10 ? 'En stock' : `Solo ${product.stock} disponibles`}
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Agregar
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/product-details?id=${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden group">
        <div className="relative aspect-square">
          <AppImage
            src={product.image}
            alt={product.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </div>
          )}
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-3 right-3 space-y-1">
              {product.badges.map(badge => (
                <div key={badge} className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                  {badge}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            {isFavorite ? (
              <HeartIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartOutlineIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 mb-3">
            {product.stock > 10 ? 'En stock' : `Solo ${product.stock} disponibles`}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            Agregar al carrito
          </button>
        </div>
      </div>
    </Link>
  );
}
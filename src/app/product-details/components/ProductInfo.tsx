"use client";

import { useState } from "react";
import { StarIcon, TruckIcon, ShieldCheckIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badges?: string[];
  variants?: Array<{ id: string; name: string; price: number; stock: number }>;
}

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[1] || null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity}x ${product.name} to cart`);
  };

  const currentPrice = selectedVariant?.price || product.price;

  // Format price consistently for server and client rendering
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CO', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* Badges */}
      {product.badges && product.badges.length > 0 && (
        <div className="flex gap-2">
          {product.badges.map(badge => (
            <span
              key={badge}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Product Name */}
      <div>
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-medium text-gray-900">{product.rating}</span>
        <span className="text-gray-500">({product.reviewCount} reseñas)</span>
      </div>

      {/* Price */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl font-bold text-gray-900">
            ${formatPrice(currentPrice)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${formatPrice(product.originalPrice)}
              </span>
              {product.discount && (
                <span className="px-2 py-1 bg-red-500 text-white text-sm font-bold rounded">
                  -{product.discount}%
                </span>
              )}
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">
          IVA incluido • Envío calculado al finalizar
        </p>
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Presentación:
          </label>
          <div className="flex gap-2">
            {product.variants.map(variant => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`
                  px-4 py-2 border-2 rounded-lg font-medium transition-colors
                  ${selectedVariant?.id === variant.id
                    ? 'border-yellow-400 bg-yellow-50 text-gray-900' :'border-gray-300 hover:border-gray-400'}
                `}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cantidad:
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="px-6 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {product.stock > 10 
                ? `${product.stock} disponibles`
                : `Solo ${product.stock} disponibles`}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Agregar al carrito
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 transition-colors"
          >
            {isFavorite ? (
              <HeartIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartOutlineIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 border-t pt-6">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <TruckIcon className="w-5 h-5 text-green-600" />
          <span>Envío gratis en compras mayores a $50.000</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
          <span>Garantía de calidad 100%</span>
        </div>
      </div>

      {/* SKU */}
      <p className="text-sm text-gray-500">
        SKU: {product.sku}
      </p>
    </div>
  );
}
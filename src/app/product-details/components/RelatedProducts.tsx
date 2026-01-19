"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { StarIcon } from "@heroicons/react/24/solid";

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  rating: number;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Relacionados</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <Link key={product.id} href={`/product-details?id=${product.id}`}>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="relative aspect-square">
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                </div>
                
                <p className="text-lg font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
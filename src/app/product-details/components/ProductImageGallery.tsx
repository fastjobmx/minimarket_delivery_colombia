"use client";

import { useState } from "react";
import AppImage from "@/components/ui/AppImage";

interface ProductImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
        <AppImage
          src={images[selectedImage].url}
          alt={images[selectedImage].alt}
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`
              relative aspect-square bg-white rounded-lg overflow-hidden
              ${selectedImage === index
                ? 'ring-2 ring-yellow-400' :'hover:ring-2 hover:ring-gray-300'}
              transition-all
            `}
          >
            <AppImage
              src={image.url}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
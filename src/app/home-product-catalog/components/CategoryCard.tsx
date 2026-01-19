'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CategoryCardProps {
  id: string;
  name: string;
  imageUrl: string;
  alt: string;
  itemCount: number;
  route: string;
}

const CategoryCard = ({ id, name, imageUrl, alt, itemCount, route }: CategoryCardProps) => {
  return (
    <Link href={route}>
      <div className="bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth press-scale group">
        <div className="relative h-40 lg:h-48 overflow-hidden">
          <AppImage
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-heading font-bold text-foreground">
              {name}
            </h3>
            <Icon
              name="ChevronRightIcon"
              size={20}
              className="text-primary group-hover:translate-x-1 transition-smooth"
            />
          </div>
          <p className="text-sm text-text-secondary caption">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
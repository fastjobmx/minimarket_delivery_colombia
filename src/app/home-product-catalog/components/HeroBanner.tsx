import React from 'react';
import AppImage from '@/components/ui/AppImage';

interface HeroBannerProps {
  imageUrl: string;
  alt: string;
  title: string;
  subtitle: string;
}

const HeroBanner = ({ imageUrl, alt, title, subtitle }: HeroBannerProps) => {
  return (
    <div className="relative w-full h-64 lg:h-80 overflow-hidden rounded-xl shadow-warm-lg">
      <AppImage
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary-foreground mb-2 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg text-primary-foreground/90 drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
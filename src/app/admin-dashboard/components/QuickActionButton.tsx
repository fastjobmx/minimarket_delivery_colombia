import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface QuickActionButtonProps {
  label: string;
  icon: string;
  href: string;
  color: 'primary' | 'accent' | 'warning';
}

const QuickActionButton = ({ label, icon, href, color }: QuickActionButtonProps) => {
  const colorClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
    warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-warm transition-smooth press-scale ${colorClasses[color]}`}
    >
      <Icon name={icon as any} size={24} variant="solid" />
      <span className="font-semibold">{label}</span>
    </Link>
  );
};

export default QuickActionButton;
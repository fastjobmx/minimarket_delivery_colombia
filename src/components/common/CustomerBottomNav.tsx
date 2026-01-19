'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

interface CustomerBottomNavProps {
  cartItemCount?: number;
}

const CustomerBottomNav = ({ cartItemCount = 0 }: CustomerBottomNavProps) => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: 'Inicio',
      icon: 'HomeIcon',
      route: '/home-product-catalog',
    },
    {
      label: 'Carrito',
      icon: 'ShoppingCartIcon',
      route: '/payment-selection',
      badge: cartItemCount,
    },
    {
      label: 'Pedidos',
      icon: 'ClipboardDocumentListIcon',
      route: '/order-confirmation',
    },
  ];

  const isActive = (route: string) => pathname === route;

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-bottom-nav shadow-warm-lg">
        <div className="flex items-center justify-around h-16 px-4">
          {navItems.map((item) => (
            <Link
              key={item.route}
              href={item.route}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-smooth relative ${
                isActive(item.route)
                  ? 'text-primary' :'text-text-secondary hover:text-primary'
              }`}
            >
              <div className="relative">
                <Icon
                  name={item.icon as any}
                  size={24}
                  variant={isActive(item.route) ? 'solid' : 'outline'}
                  className="transition-smooth"
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-warm data-text">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-xs mt-1 font-medium transition-smooth ${
                  isActive(item.route) ? 'font-semibold' : ''
                }`}
              >
                {item.label}
              </span>
              {isActive(item.route) && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full transition-spring" />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Header Navigation */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 bg-card border-b border-border z-bottom-nav shadow-warm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/home-product-catalog" className="flex items-center gap-3 hover:opacity-80 transition-smooth">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-warm">
              <Icon name="ShoppingBagIcon" size={24} variant="solid" className="text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-primary">MiniMarket</span>
          </Link>

          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.route}
                href={item.route}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth relative press-scale ${
                  isActive(item.route)
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : 'text-text-secondary hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon
                  name={item.icon as any}
                  size={20}
                  variant={isActive(item.route) ? 'solid' : 'outline'}
                />
                <span className="font-medium">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center shadow-warm data-text">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Spacer for fixed header on desktop */}
      <div className="hidden lg:block h-16" />
      
      {/* Spacer for fixed bottom nav on mobile */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default CustomerBottomNav;
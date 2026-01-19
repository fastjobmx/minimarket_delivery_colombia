'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

interface AdminSidebarProps {
  isCollapsed?: boolean;
  notificationCount?: number;
}

const AdminSidebar = ({ isCollapsed = false, notificationCount = 0 }: AdminSidebarProps) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: 'Panel',
      icon: 'ChartBarIcon',
      route: '/admin-dashboard',
    },
    {
      label: 'Órdenes',
      icon: 'ShoppingBagIcon',
      route: '/order-management',
      badge: notificationCount,
    },
    {
      label: 'Inventario',
      icon: 'CubeIcon',
      route: '/inventory-management',
    },
  ];

  const isActive = (route: string) => pathname === route;

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile Header with Menu Toggle */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-card border-b border-border z-sidebar shadow-warm">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/admin-dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-warm">
              <Icon name="ShoppingBagIcon" size={20} variant="solid" className="text-primary-foreground" />
            </div>
            <span className="text-lg font-heading font-bold text-primary">Admin</span>
          </Link>
          
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-muted transition-smooth press-scale"
            aria-label="Toggle menu"
          >
            <Icon name={isMobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background z-sidebar"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border z-sidebar shadow-warm-xl transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.route}
              href={item.route}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth relative press-scale ${
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
              <span className="font-medium flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center shadow-warm data-text">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 bottom-0 bg-card border-r border-border z-sidebar shadow-warm-lg transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 h-16 px-6 border-b border-border">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-warm flex-shrink-0">
              <Icon name="ShoppingBagIcon" size={24} variant="solid" className="text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-heading font-bold text-primary">Admin</span>
            )}
          </div>

          <nav className="flex flex-col p-4 gap-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.route}
                href={item.route}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth relative press-scale group ${
                  isActive(item.route)
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : 'text-text-secondary hover:bg-muted hover:text-primary'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  name={item.icon as any}
                  size={20}
                  variant={isActive(item.route) ? 'solid' : 'outline'}
                  className="flex-shrink-0"
                />
                {!isCollapsed && (
                  <>
                    <span className="font-medium flex-1">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center shadow-warm data-text">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </>
                )}
                {isCollapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-warm data-text">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Spacer for fixed sidebar on desktop */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`} />
      
      {/* Spacer for fixed header on mobile */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default AdminSidebar;
'use client';

import { useState } from 'react';
import {
  SwatchIcon,
  PhotoIcon,
  TagIcon,
  CubeIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import ThemeCustomizer from './ThemeCustomizer';
import BannerManager from './BannerManager';
import CategoryManager from './CategoryManager';
import ProductEditor from './ProductEditor';
import GeneralSettings from './GeneralSettings';
import Icon from '@/components/ui/AppIcon';


type TabType = 'theme' | 'banners' | 'categories' | 'products' | 'general';

interface Tab {
  id: TabType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function AdminSettingsInteractive() {
  const [activeTab, setActiveTab] = useState<TabType>('theme');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const tabs: Tab[] = [
    {
      id: 'theme',
      name: 'Tema y Colores',
      icon: SwatchIcon,
      description: 'Personaliza colores, tipografías y estilos visuales',
    },
    {
      id: 'banners',
      name: 'Banners',
      icon: PhotoIcon,
      description: 'Gestiona banners promocionales y imágenes destacadas',
    },
    {
      id: 'categories',
      name: 'Categorías',
      icon: TagIcon,
      description: 'Administra categorías de productos',
    },
    {
      id: 'products',
      name: 'Productos',
      icon: CubeIcon,
      description: 'Edita productos y su información',
    },
    {
      id: 'general',
      name: 'General',
      icon: Cog6ToothIcon,
      description: 'Configuraciones generales de la tienda',
    },
  ];

  const handleSaveSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'theme':
        return <ThemeCustomizer onSaveSuccess={handleSaveSuccess} />;
      case 'banners':
        return <BannerManager onSaveSuccess={handleSaveSuccess} />;
      case 'categories':
        return <CategoryManager onSaveSuccess={handleSaveSuccess} />;
      case 'products':
        return <ProductEditor onSaveSuccess={handleSaveSuccess} />;
      case 'general':
        return <GeneralSettings onSaveSuccess={handleSaveSuccess} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <CheckCircleIcon className="h-6 w-6" />
          <span className="font-medium">{successMessage}</span>
          <button
            onClick={() => setShowSuccessAlert(false)}
            className="ml-2 hover:bg-green-600 rounded-lg p-1 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          Configuración del Sistema
        </h1>
        <p className="text-muted-foreground">
          Personaliza y administra todos los aspectos de tu tienda online
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-card border border-border rounded-2xl p-2 mb-6 shadow-warm">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-background hover:bg-muted text-muted-foreground'
                  }
                `}
              >
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium text-center">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Description */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
        <p className="text-sm text-foreground">
          {tabs.find((tab) => tab.id === activeTab)?.description}
        </p>
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-2xl shadow-warm">
        {renderTabContent()}
      </div>
    </div>
  );
}
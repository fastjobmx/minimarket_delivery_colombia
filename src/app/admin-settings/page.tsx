import type { Metadata } from 'next';
import AdminSidebar from '@/components/common/AdminSidebar';
import NotificationCenter from '@/components/common/NotificationCenter';
import AdminSettingsInteractive from './components/AdminSettingsInteractive';

export const metadata: Metadata = {
  title: 'Configuración del Sistema - MiniMarket Admin',
  description: 'Personaliza colores, banners, categorías, productos y configuraciones de tu tienda',
};

export default function AdminSettingsPage() {
  const mockNotifications = [
    {
      id: '1',
      type: 'system' as const,
      title: 'Configuración actualizada',
      message: 'Los cambios de tema se aplicaron exitosamente',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
    },
  ];

  return (
    <>
      <AdminSidebar notificationCount={1} />
      
      <div className="lg:ml-64">
        <header className="hidden lg:flex items-center justify-between h-16 px-6 bg-card border-b border-border sticky top-0 z-10 shadow-warm">
          <h1 className="text-xl font-heading font-bold">Configuración del Sistema</h1>
          <NotificationCenter notifications={mockNotifications} />
        </header>

        <main>
          <AdminSettingsInteractive />
        </main>
      </div>
    </>
  );
}
import type { Metadata } from 'next';
import AdminSidebar from '@/components/common/AdminSidebar';
import NotificationCenter from '@/components/common/NotificationCenter';
import AdminDashboardInteractive from './components/AdminDashboardInteractive';

export const metadata: Metadata = {
  title: 'Panel de Control - MiniMarket Admin',
  description: 'Gestiona tu minimarket con análisis en tiempo real, seguimiento de pedidos, gestión de inventario y insights impulsados por IA para optimizar las ventas y operaciones.',
};

export default function AdminDashboardPage() {
  const mockNotifications = [
    {
      id: '1',
      type: 'order' as const,
      title: 'Nuevo pedido recibido',
      message: 'María González realizó un pedido de $45.000',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
    },
    {
      id: '2',
      type: 'inventory' as const,
      title: 'Alerta de stock bajo',
      message: 'Arroz Diana 500g tiene solo 8 unidades disponibles',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
    },
    {
      id: '3',
      type: 'order' as const,
      title: 'Pedido despachado',
      message: 'Pedido #1545 enviado a Ana Martínez',
      timestamp: new Date(Date.now() - 25 * 60000),
      read: true,
    },
  ];

  return (
    <>
      <AdminSidebar notificationCount={2} />
      
      <div className="lg:ml-64">
        <header className="hidden lg:flex items-center justify-between h-16 px-6 bg-card border-b border-border sticky top-0 z-10 shadow-warm">
          <h1 className="text-xl font-heading font-bold">Panel de Control</h1>
          <NotificationCenter notifications={mockNotifications} />
        </header>

        <main>
          <AdminDashboardInteractive />
        </main>
      </div>
    </>
  );
}
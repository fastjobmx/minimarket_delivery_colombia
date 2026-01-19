import type { Metadata } from 'next';
import OrderManagementInteractive from './components/OrderManagementInteractive';

export const metadata: Metadata = {
  title: 'Gestión de Órdenes - MiniMarket Admin',
  description: 'Procesa y gestiona órdenes de clientes con actualizaciones de estado en tiempo real, comunicación por WhatsApp y herramientas de filtrado avanzadas para administradores de MiniMarket.',
};

export default function OrderManagementPage() {
  return <OrderManagementInteractive />;
}
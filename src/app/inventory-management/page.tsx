import type { Metadata } from 'next';
import InventoryInteractive from './components/InventoryInteractive';

export const metadata: Metadata = {
  title: 'Gestión de Inventario - MiniMarket Delivery Colombia',
  description: 'Administra el catálogo de productos, actualiza niveles de stock, gestiona precios y categorías con operaciones CRUD completas para tu minimarket.',
};

export default function InventoryManagementPage() {
  return <InventoryInteractive />;
}
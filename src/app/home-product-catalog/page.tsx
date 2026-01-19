import type { Metadata } from 'next';
import HomeProductCatalogInteractive from './components/HomeProductCatalogInteractive';

export const metadata: Metadata = {
  title: 'Catálogo de Productos - MiniMarket Delivery Colombia',
  description: 'Explora nuestro catálogo completo de productos frescos con entrega a domicilio en 30 minutos. Frutas, lácteos, panadería, bebidas y más con pago por Nequi, Daviplata o efectivo.',
};

export default function HomeProductCatalogPage() {
  return <HomeProductCatalogInteractive />;
}
import type { Metadata } from 'next';
import CustomerBottomNav from '@/components/common/CustomerBottomNav';
import OrderConfirmationInteractive from './components/OrderConfirmationInteractive';

export const metadata: Metadata = {
  title: 'Confirmación de Pedido - MiniMarket Delivery',
  description: 'Detalles completos de tu pedido confirmado con seguimiento en tiempo real, información de entrega y opciones de contacto directo con la tienda.',
};

export default function OrderConfirmationPage() {
  return (
    <>
      <CustomerBottomNav cartItemCount={0} />
      <OrderConfirmationInteractive />
    </>
  );
}
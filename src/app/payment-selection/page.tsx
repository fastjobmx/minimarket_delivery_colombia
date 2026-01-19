import type { Metadata } from 'next';
import PaymentSelectionInteractive from './components/PaymentSelectionInteractive';

export const metadata: Metadata = {
  title: 'Selección de Pago - MiniMarket Delivery',
  description: 'Elige tu método de pago preferido: Nequi, Daviplata, PSE o efectivo. Completa tu compra de forma segura con opciones de pago colombianas.',
};

export default function PaymentSelectionPage() {
  return <PaymentSelectionInteractive />;
}
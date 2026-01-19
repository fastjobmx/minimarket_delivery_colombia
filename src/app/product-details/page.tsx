import { Metadata } from "next";
import ProductDetailsInteractive from "./components/ProductDetailsInteractive";

export const metadata: Metadata = {
  title: "Detalles del Producto - Minimarket",
  description: "Información detallada del producto en tu minimarket colombiano de confianza",
};

export default function ProductDetailsPage() {
  return <ProductDetailsInteractive />;
}
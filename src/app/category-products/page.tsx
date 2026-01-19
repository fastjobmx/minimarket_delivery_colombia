import { Metadata } from "next";
import CategoryProductsInteractive from "./components/CategoryProductsInteractive";

export const metadata: Metadata = {
  title: "Categoría - Minimarket",
  description: "Productos por categoría en tu minimarket colombiano de confianza",
};

export default function CategoryProductsPage() {
  return <CategoryProductsInteractive />;
}
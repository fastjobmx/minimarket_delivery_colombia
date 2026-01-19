"use client";


import { useSearchParams, useRouter } from "next/navigation";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import FloatingCart from "@/components/common/FloatingCart";
import CustomerBottomNav from "@/components/common/CustomerBottomNav";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: Array<{url: string;alt: string;}>;
  category: string;
  subcategory?: string;
  brand: string;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badges?: string[];
  variants?: Array<{id: string;name: string;price: number;stock: number;}>;
  nutritionalInfo?: {
    servingSize: string;
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  specifications: Array<{label: string;value: string;}>;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export default function ProductDetailsInteractive() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("id") || "1";

  const mockProduct: Product = {
    id: productId,
    name: "Arroz Diana Premium",
    description: "Arroz de primera calidad, 5kg",
    longDescription: "El Arroz Diana Premium es un producto de primera calidad, cultivado en las mejores tierras colombianas. Con un proceso de selección riguroso, garantizamos granos perfectos, sin impurezas y con excelente cocción. Ideal para todo tipo de preparaciones: arroz blanco, paellas, sopas y guarniciones. Su presentación de 5kg es perfecta para familias que buscan calidad y economía.",
    price: 18900,
    originalPrice: 22000,
    discount: 14,
    images: [
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_15ae77e89-1766309506603.png", alt: "Paquete de arroz Diana Premium vista frontal" },
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_108e795f8-1768397864102.png", alt: "Arroz Diana Premium vista lateral" },
    { url: "https://images.unsplash.com/photo-1686820740687-426a7b9b2043", alt: "Granos de arroz Diana Premium de cerca" },
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_101e85b49-1768397864882.png", alt: "Arroz Diana Premium empacado" }],

    category: "Granos",
    subcategory: "Arroz",
    brand: "Diana",
    sku: "ARR-DIA-5KG-001",
    stock: 45,
    rating: 4.7,
    reviewCount: 234,
    badges: ["Oferta", "Más vendido"],
    variants: [
    { id: "1", name: "1kg", price: 4200, stock: 89 },
    { id: "2", name: "5kg", price: 18900, stock: 45 },
    { id: "3", name: "10kg", price: 35000, stock: 23 }],

    nutritionalInfo: {
      servingSize: "100g",
      calories: 365,
      protein: "7.5g",
      carbs: "80g",
      fat: "0.9g"
    },
    specifications: [
    { label: "Peso", value: "5kg" },
    { label: "Origen", value: "Colombia" },
    { label: "Tipo de grano", value: "Largo fino" },
    { label: "Cocción", value: "20 minutos" },
    { label: "Rendimiento", value: "2.5x su volumen" },
    { label: "Conservación", value: "Lugar fresco y seco" }]

  };

  const mockReviews: Review[] = [
  {
    id: "1",
    userName: "María García",
    rating: 5,
    date: "2025-01-10",
    comment: "Excelente calidad, el arroz queda suelto y sabroso. Lo recomiendo 100%",
    verified: true
  },
  {
    id: "2",
    userName: "Carlos Rodríguez",
    rating: 4,
    date: "2025-01-08",
    comment: "Muy buen producto, aunque el empaque podría mejorar. El arroz es de primera.",
    verified: true
  },
  {
    id: "3",
    userName: "Ana Martínez",
    rating: 5,
    date: "2025-01-05",
    comment: "El mejor arroz que he probado. No tiene impurezas y queda perfecto.",
    verified: true
  }];


  const relatedProducts = [
  {
    id: "2",
    name: "Aceite Girasol Premier",
    price: 24500,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5eaf999-1765022942690.png",
    alt: "Botella de aceite de girasol Premier",
    rating: 4.5
  },
  {
    id: "3",
    name: "Panela San José",
    price: 3200,
    image: "https://images.unsplash.com/photo-1556909114-16a2409962b9",
    alt: "Panela redonda San José",
    rating: 4.8
  },
  {
    id: "4",
    name: "Fríjol Rojo Premium",
    price: 8900,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_100207931-1768397864881.png",
    alt: "Paquete de fríjol rojo premium",
    rating: 4.6
  },
  {
    id: "5",
    name: "Pasta Linguini",
    price: 4500,
    image: "https://images.unsplash.com/photo-1732656633571-03cf9920d673",
    alt: "Pasta linguini italiana",
    rating: 4.7
  }];


  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900">

            <ChevronLeftIcon className="w-5 h-5" />
            <span>Volver</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery images={mockProduct.images} productName={mockProduct.name} />
          <ProductInfo product={mockProduct} />
        </div>

        {/* Product Details Tabs */}
        <ProductTabs
          description={mockProduct.longDescription}
          specifications={mockProduct.specifications}
          nutritionalInfo={mockProduct.nutritionalInfo}
          reviews={mockReviews}
          rating={mockProduct.rating}
          reviewCount={mockProduct.reviewCount} />


        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>

      <FloatingCart />
      <CustomerBottomNav />
    </div>);

}
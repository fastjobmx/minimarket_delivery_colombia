"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

interface Specification {
  label: string;
  value: string;
}

interface NutritionalInfo {
  servingSize: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface ProductTabsProps {
  description: string;
  specifications: Specification[];
  nutritionalInfo?: NutritionalInfo;
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export default function ProductTabs({
  description,
  specifications,
  nutritionalInfo,
  reviews,
  rating,
  reviewCount
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");

  const tabs = [
    { id: "description", label: "Descripción" },
    { id: "specifications", label: "Especificaciones" },
    { id: "reviews", label: `Reseñas (${reviewCount})` }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tab Headers */}
      <div className="border-b">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 px-6 py-4 font-medium transition-colors
                ${activeTab === tab.id
                  ? 'border-b-2 border-yellow-400 text-gray-900' :'text-gray-600 hover:text-gray-900'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "description" && (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{description}</p>
            
            {nutritionalInfo && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información Nutricional</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-3">Porción: {nutritionalInfo.servingSize}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Calorías</p>
                      <p className="text-lg font-medium text-gray-900">{nutritionalInfo.calories} kcal</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Proteínas</p>
                      <p className="text-lg font-medium text-gray-900">{nutritionalInfo.protein}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Carbohidratos</p>
                      <p className="text-lg font-medium text-gray-900">{nutritionalInfo.carbs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Grasas</p>
                      <p className="text-lg font-medium text-gray-900">{nutritionalInfo.fat}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Especificaciones del Producto</h3>
            <div className="space-y-3">
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-start gap-4 py-2 border-b last:border-b-0">
                  <span className="text-gray-600 w-1/3">{spec.label}</span>
                  <span className="text-gray-900 font-medium w-2/3">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="flex items-center gap-6 pb-6 border-b">
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-900 mb-2">{rating}</p>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{reviewCount} reseñas</p>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{review.userName}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckBadgeIcon className="w-4 h-4" />
                            Compra verificada
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('es-CO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-lg font-medium transition-colors">
              Escribir una reseña
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
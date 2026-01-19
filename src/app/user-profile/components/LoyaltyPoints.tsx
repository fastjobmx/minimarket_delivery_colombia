'use client';

import React from 'react';

interface LoyaltyPointsData {
  currentPoints: number;
  copValue: number;
  tier: string;
  nextTier: string;
  pointsToNextTier: number;
}

interface LoyaltyPointsProps {
  points: LoyaltyPointsData;
}

const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({ points }) => {
  const progressPercentage = (points.currentPoints / (points.currentPoints + points.pointsToNextTier)) * 100;

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'gold':
        return 'from-yellow-400 to-yellow-600';
      case 'platinum':
        return 'from-gray-300 to-gray-500';
      case 'diamond':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-gray-200 to-gray-400';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'gold':
        return '🥇';
      case 'platinum':
        return '⚪';
      case 'diamond':
        return '💎';
      default:
        return '⭐';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Points Card */}
      <div className={`bg-gradient-to-br ${getTierColor(points.tier)} rounded-xl p-8 text-white shadow-xl`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Tu nivel actual</p>
            <div className="flex items-center gap-3">
              <span className="text-5xl">{getTierIcon(points.tier)}</span>
              <h2 className="text-3xl font-heading font-bold">
                {points.tier}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/80 text-sm mb-1">Puntos disponibles</p>
            <p className="text-3xl font-bold">{points.currentPoints.toLocaleString('es-CO')}</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/80 text-sm mb-1">Valor en pesos</p>
            <p className="text-3xl font-bold">${points.copValue.toLocaleString('es-CO')}</p>
          </div>
        </div>

        <button className="w-full bg-white text-foreground py-3 rounded-lg font-medium hover:bg-white/90 transition-smooth press-scale">
          Redimir puntos
        </button>
      </div>

      {/* Progress to Next Tier */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-1">
              Progreso al siguiente nivel
            </h3>
            <p className="text-text-secondary text-sm">
              {points.pointsToNextTier.toLocaleString('es-CO')} puntos más para {getTierIcon(points.nextTier)} {points.nextTier}
            </p>
          </div>
        </div>

        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="text-xs text-text-secondary text-right">
          {progressPercentage.toFixed(0)}% completado
        </p>
      </div>

      {/* How to Earn Points */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-heading font-bold text-foreground mb-4">
          Cómo ganar puntos
        </h3>

        <div className="space-y-4">
          {[
            { icon: '🛒', title: 'Por cada compra', points: '1 punto por cada $1.000 COP' },
            { icon: '📅', title: 'Pedidos frecuentes', points: '50 puntos extra por pedido semanal' },
            { icon: '⭐', title: 'Reseñas', points: '25 puntos por reseña verificada' },
            { icon: '👥', title: 'Referidos', points: '100 puntos por cada amigo referido' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl">{item.icon}</div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-text-secondary">{item.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redemption Options */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-heading font-bold text-foreground mb-4">
          Opciones de canje
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { points: 500, value: 5000, discount: '10%' },
            { points: 1000, value: 12000, discount: '20%' },
            { points: 2000, value: 28000, discount: '40%' },
            { points: 5000, value: 75000, discount: '50%' }
          ].map((option, index) => (
            <div
              key={index}
              className="border-2 border-primary/20 rounded-lg p-4 hover:border-primary transition-smooth"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-primary">
                  {option.points} pts
                </span>
                <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full">
                  {option.discount} OFF
                </span>
              </div>
              <p className="text-foreground font-medium">
                = ${option.value.toLocaleString('es-CO')} COP
              </p>
              <button className="w-full mt-3 bg-primary/10 text-primary py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-smooth press-scale">
                Canjear
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPoints;
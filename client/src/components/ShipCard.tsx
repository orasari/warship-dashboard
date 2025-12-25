import { useState } from 'react';
import { NormalizedShip } from '../types/api.types';

interface ShipCardProps {
  ship: NormalizedShip;
  style?: React.CSSProperties;
}

export default function ShipCard({ ship, style }: ShipCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={style}
      className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20"
    >
      {/* Ship Image */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 h-36 flex items-center justify-center">
        {ship.icon && !imgError ? (
          <img
            src={ship.icon}
            alt={ship.displayName}
            onError={() => setImgError(true)}
            className="max-h-full max-w-full object-contain p-2"
            loading="lazy"
          />
        ) : (
          <div className="text-slate-600 text-4xl">⚓</div>
        )}

        {/* Tier Badge */}
        <div className="absolute top-2 right-2 bg-yellow-600 text-white px-2 py-1 rounded text-sm font-bold">
          {ship.level}
        </div>

        {/* Premium/Special Badge */}
        {(ship.isPremium || ship.isSpecial) && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">
            {ship.isPremium ? 'Premium' : 'Special'}
          </div>
        )}
      </div>

      {/* Ship Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-blue-200 mb-2 truncate">
          {ship.displayName}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2 flex-wrap">
          <span className="bg-slate-700 px-2 py-1 rounded">
            {ship.nationDisplay}
          </span>
          <span className="bg-slate-700 px-2 py-1 rounded">
            {ship.typeDisplay}
          </span>
        </div>

        {ship.description && (
          <p className="text-xs text-slate-400 line-clamp-2">
            {ship.description}
          </p>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Award, Sparkles } from 'lucide-react';
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
      className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20 flex flex-col h-full"
    >
      {/* Ship Image */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 h-40 flex items-center justify-center flex-shrink-0">
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

        {/* Premium Badge */}
        {ship.isPremium && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            <Award className="w-3 h-3" />
            Premium
          </div>
        )}

        {/* Special Badge */}
        {ship.isSpecial && !ship.isPremium && (
          <div className="absolute top-2 left-2 bg-cyan-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Special
          </div>
        )}
      </div>

      {/* Ship Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base text-blue-200 mb-2 truncate">
          {ship.displayName}
        </h3>

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 flex-wrap">
          <span className="bg-slate-700 px-2 py-1 rounded">
            {ship.nationDisplay}
          </span>
          <span className="bg-slate-700 px-2 py-1 rounded">
            {ship.typeDisplay}
          </span>
        </div>

        {ship.description && (
          <p className="text-xs text-slate-400 line-clamp-2 flex-grow">
            {ship.description}
          </p>
        )}
      </div>
    </div>
  );
}
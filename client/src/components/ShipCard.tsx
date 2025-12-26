import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Sparkles } from 'lucide-react';
import { NormalizedShip } from '../types/api.types';

interface ShipCardProps {
  ship: NormalizedShip;
}

export default function ShipCard({ ship }: ShipCardProps) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ship/${ship.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${ship.displayName}`}
      className="card-interactive flex flex-col h-full group"
    >
      {/* Ship Image */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 h-40 flex items-center justify-center flex-shrink-0 group-hover:from-slate-700 group-hover:to-slate-800 transition-all">
        {ship.icon && !imgError ? (
          <img
            src={ship.icon}
            alt={ship.displayName}
            onError={() => setImgError(true)}
            className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        ) : (
          <div className="text-slate-600 text-4xl">⚓</div>
        )}

        {/* Tier Badge */}
        <div className="absolute top-2 right-2 badge-tier">
          {ship.level}
        </div>

        {/* Premium Badge */}
        {ship.isPremium && (
          <div className="absolute top-2 left-2 badge-premium">
            <Award className="w-3 h-3" />
            Premium
          </div>
        )}

        {/* Special Badge */}
        {ship.isSpecial && !ship.isPremium && (
          <div className="absolute top-2 left-2 badge-special">
            <Sparkles className="w-3 h-3" />
            Special
          </div>
        )}
      </div>

      {/* Ship Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base text-blue-200 mb-2 truncate group-hover:text-blue-100 transition-colors">
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
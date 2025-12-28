import { useNavigate } from 'react-router-dom';
import { Award, Sparkles } from 'lucide-react';
import { NormalizedShip } from '../types/api.types';

interface ShipCardProps {
  ship: NormalizedShip;
  isFirstCard?: boolean;
}

export default function ShipCard({ ship, isFirstCard = false }: ShipCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/ship/${ship.id}`)}
      className="card-interactive  group cursor-pointer"
    >
      {/* Image Container with fixed aspect ratio */}
      <div className="relative  bg-gradient-to-br aspect-video bg-slate-800 rounded-t-lg overflow-hidden">
        <img
          src={ship.icon}
          alt={`${ship.displayName} warship`}
          width={400}
          height={225}
          loading={isFirstCard ? 'eager' : 'lazy'}
          fetchPriority={isFirstCard ? 'high' : 'auto'}
          className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform"
        />

        {/* Tier Badge */}
        <div className="absolute top-2 right-2 badge-tier">{ship.level}</div>

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

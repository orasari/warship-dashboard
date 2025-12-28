import { Award, Sparkles } from 'lucide-react';

interface ShipHeroProps {
  icon: string;
  displayName: string;
  level: number;
  isPremium: boolean;
  isSpecial: boolean;
}

export default function ShipHero({ 
  icon, 
  displayName, 
  level, 
  isPremium, 
  isSpecial 
}: ShipHeroProps) {
  return (
    <div className="flex-1 w-full max-w-2xl">
      <div className="relative aspect-video card-base">
        <img
          src={icon}
          alt={displayName}
          className="w-full h-full object-contain p-4"
          loading="eager"
        />
        
        {/* Tier Badge */}
        <div className="absolute top-4 right-4 badge-tier-large">
          Tier {level}
        </div>

        {/* Premium/Special Badge */}
        {isPremium && (
          <div className="absolute top-4 left-4 badge-premium px-3 py-2 text-sm gap-2">
            <Award className="w-4 h-4" />
            Premium
          </div>
        )}
        {isSpecial && !isPremium && (
          <div className="absolute top-4 left-4 badge-special px-3 py-2 text-sm gap-2">
            <Sparkles className="w-4 h-4" />
            Special
          </div>
        )}
      </div>
    </div>
  );
}
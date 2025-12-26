import { Award, Sparkles } from 'lucide-react';

interface StatusBadgeProps {
  isPremium: boolean;
  isSpecial: boolean;
}

export default function StatusBadge({ isPremium, isSpecial }: StatusBadgeProps) {
  if (isPremium) {
    return (
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-purple-400" />
        <span className="text-purple-300">Premium Ship</span>
      </div>
    );
  }
  
  if (isSpecial) {
    return (
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <span className="text-cyan-300">Special Ship</span>
      </div>
    );
  }
  
  return <span className="text-slate-300">Standard Ship</span>;
}
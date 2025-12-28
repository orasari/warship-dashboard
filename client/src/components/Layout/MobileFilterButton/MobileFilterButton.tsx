import { SlidersHorizontal } from 'lucide-react';

interface MobileFilterButtonProps {
  onClick: () => void;
}

export default function MobileFilterButton({
  onClick,
}: MobileFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg shadow-blue-500/50 transition-all z-40 flex items-center gap-2"
    >
      <SlidersHorizontal className="w-6 h-6" />
    </button>
  );
}

import { X } from 'lucide-react';
import FilterPanel from '../../FilterPanel';

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterModal({
  isOpen,
  onClose,
}: MobileFilterModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="lg:hidden fixed inset-x-0 bottom-0 bg-slate-900 rounded-t-2xl shadow-2xl z-50 max-h-[85vh] flex flex-col animate-slide-up">
        <div className="flex items-center justify-center py-3 border-b border-slate-700">
          <div className="w-12 h-1 bg-slate-600 rounded-full" />
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <h2 className="text-xl font-bold text-blue-300">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <FilterPanel />
        </div>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

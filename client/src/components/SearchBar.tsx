import { Search, Award, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSearchQuery, togglePremiumFilter, toggleSpecialFilter } from '../features/ships/shipsSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { searchQuery, showPremiumOnly, showSpecialOnly } = useAppSelector(
    (state) => state.ships.filters
  );

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search ships by name..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-400"
        />
      </div>

      {/* Quick Toggle Pills */}
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(togglePremiumFilter())}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            showPremiumOnly
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-purple-300'
          }`}
        >
          <Award className="w-4 h-4" />
          Premium Only
        </button>

        <button
          onClick={() => dispatch(toggleSpecialFilter())}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            showSpecialOnly
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-cyan-300'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Special Only
        </button>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Search, Award, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSearchQuery, togglePremiumFilter, toggleSpecialFilter } from '../features/ships/shipsSlice';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { searchQuery, showPremiumOnly, showSpecialOnly } = useAppSelector(
    (state) => state.ships.filters
  );

  // Local state for the input value (updates immediately)
  const [inputValue, setInputValue] = useState(searchQuery);
  
  // Debounced value (updates after 300ms of no typing)
  const debouncedSearchQuery = useDebounce(inputValue, 300);

  // Update Redux when debounced value changes
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  // Sync local state if Redux state changes externally (e.g., clear filters)
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search ships by name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-search"
        />
      </div>

      {/* Quick Toggle Pills */}
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(togglePremiumFilter())}
          className={showPremiumOnly ? 'btn-filter-active-premium' : 'btn-filter-inactive hover:text-purple-300'}
        >
          <Award className="w-4 h-4" />
          Premium Only
        </button>

        <button
          onClick={() => dispatch(toggleSpecialFilter())}
          className={showSpecialOnly ? 'btn-filter-active-special' : 'btn-filter-inactive hover:text-cyan-300'}
        >
          <Sparkles className="w-4 h-4" />
          Special Only
        </button>
      </div>
    </div>
  );
}
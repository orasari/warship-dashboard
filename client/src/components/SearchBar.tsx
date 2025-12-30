import { useState, useEffect } from 'react';
import { Search, Award, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setSearchQuery,
  togglePremiumFilter,
  toggleSpecialFilter,
} from '../features/ships/shipsSlice';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is handled by the debounced effect
  };

  return (
    <section className="space-y-3" aria-label="Search and filters">
      {/* Search Input */}
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <label htmlFor="ship-search" className="sr-only">
            Search ships by name
          </label>
          <Search
            className="absolute left-3 top-3 w-5 h-5 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="ship-search"
            type="search"
            placeholder="Search ships by name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input-search"
            aria-label="Search ships by name"
          />
        </div>
      </form>

      {/* Quick Toggle Pills */}
      <div className="flex gap-2" role="group" aria-label="Quick filters">
        <button
          type="button"
          onClick={() => dispatch(togglePremiumFilter())}
          className={
            showPremiumOnly
              ? 'btn-filter-active-premium'
              : 'btn-filter-inactive hover:text-purple-300'
          }
          aria-pressed={showPremiumOnly}
          aria-label="Filter premium ships only"
        >
          <Award className="w-4 h-4" aria-hidden="true" />
          Premium Only
        </button>

        <button
          type="button"
          onClick={() => dispatch(toggleSpecialFilter())}
          className={
            showSpecialOnly
              ? 'btn-filter-active-special'
              : 'btn-filter-inactive hover:text-cyan-300'
          }
          aria-pressed={showSpecialOnly}
          aria-label="Filter special ships only"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          Special Only
        </button>
      </div>
    </section>
  );
}

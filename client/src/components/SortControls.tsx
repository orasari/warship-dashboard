import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSortBy, setSortDirection } from '../features/ships/shipsSlice';
import { SortOption } from '../types/api.types';

export default function SortControls() {
  const dispatch = useAppDispatch();
  const { sortBy, sortDirection } = useAppSelector((state) => state.ships);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'level', label: 'Tier' },
    { value: 'nation', label: 'Nation' },
    { value: 'type', label: 'Type' },
  ];

  const handleSortChange = (newSort: SortOption) => {
    if (sortBy === newSort) {
      // Toggle direction if clicking same sort option
      dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      // Change sort option
      dispatch(setSortBy(newSort));
    }
  };

  const toggleDirection = () => {
    dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-800/30 border border-slate-700 rounded-lg">
      {/* Direction Toggle */}
      <button
        onClick={toggleDirection}
        className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
        title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sortDirection === 'asc' ? (
          <ArrowUp className="w-4 h-4 text-slate-300" />
        ) : (
          <ArrowDown className="w-4 h-4 text-slate-300" />
        )}
      </button>

      <div className="flex items-center gap-2 text-sm text-slate-400">
        <ArrowUpDown className="w-4 h-4" />
        <span className="font-medium">Sort by:</span>
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap gap-1">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={`
              px-3 py-1.5 text-sm rounded-lg transition-colors
              ${
                sortBy === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
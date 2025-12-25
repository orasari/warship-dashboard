import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSearchQuery } from '../features/ships/shipsSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.ships.filters.searchQuery);

  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
      <input
        type="text"
        placeholder="Search ships by name or description..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-400"
      />
    </div>
  );
}
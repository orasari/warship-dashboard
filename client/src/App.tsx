import { useEffect } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchAllData } from './features/ships/shipsSlice';
import ShipList from './components/ShipList';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';

export default function App() {
  const dispatch = useAppDispatch();
  const { loading, error, filteredShips, normalizedShips } = useAppSelector(
    (state) => state.ships
  );

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-blue-200 text-lg">Loading World of Warships Fleet...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-200 mb-2 text-center">
            Service Unavailable
          </h2>
          <p className="text-red-300 text-center mb-4">{error}</p>
          <p className="text-sm text-red-200/70 text-center mb-4">
            Make sure the proxy server is running on port 3001
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-blue-500/30 flex-shrink-0">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-300">
            World of Warships Fleet
          </h1>
        </div>
      </header>

      {/* Main Content - Sidebar + Ships */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Filters */}
        <aside className="w-80 bg-slate-900/50 border-r border-slate-700 flex flex-col flex-shrink-0">
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
            {/* Search Bar */}
            <SearchBar />

            {/* Results Count */}
            <div className="text-sm text-slate-400">
              Showing {filteredShips.length} of {normalizedShips.length} ships
            </div>

            {/* Filter Panel */}
            <FilterPanel />
          </div>
        </aside>

        {/* Right Side - Ships List */}
        <main className="flex-1 overflow-hidden p-6">
          {filteredShips.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-400 text-lg">
                No ships found matching your criteria
              </p>
            </div>
          ) : (
            <ShipList ships={filteredShips} />
          )}
        </main>
      </div>
    </div>
  );
}
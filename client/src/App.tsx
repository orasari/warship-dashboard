import { useEffect, useState } from 'react';
import { Loader, AlertCircle, SlidersHorizontal, X } from 'lucide-react';
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  const closeMobileFilters = () => setShowMobileFilters(false);

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
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-blue-500/30 flex-shrink-0">
        <div className="px-4 md:px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-300">
            World of Warships Fleet
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:flex w-80 bg-slate-900/50 border-r border-slate-700 flex-col flex-shrink-0">
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
            <SearchBar />
            <div className="text-sm text-slate-400">
              Showing {filteredShips.length} of {normalizedShips.length} ships
            </div>
            <FilterPanel />
          </div>
        </aside>

        <div className="lg:hidden absolute top-20 left-0 right-0 z-10 px-4 pb-4 bg-gradient-to-b from-slate-900 to-transparent">
          <SearchBar />
          <div className="text-sm text-slate-400 mt-2">
            Showing {filteredShips.length} of {normalizedShips.length} ships
          </div>
        </div>

        <main className="flex-1 overflow-hidden p-4 md:p-6 pt-32 lg:pt-6">
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

      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg shadow-blue-500/50 transition-all z-40 flex items-center gap-2"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>

      {showMobileFilters && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={closeMobileFilters}
          />

          <div className="lg:hidden fixed inset-x-0 bottom-0 bg-slate-900 rounded-t-2xl shadow-2xl z-50 max-h-[85vh] flex flex-col animate-slide-up">
            <div className="flex items-center justify-center py-3 border-b border-slate-700">
              <div className="w-12 h-1 bg-slate-600 rounded-full" />
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
              <h2 className="text-xl font-bold text-blue-300">Filters</h2>
              <button
                onClick={closeMobileFilters}
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
                onClick={closeMobileFilters}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
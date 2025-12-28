import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchAllData } from './features/ships/shipsSlice';
import ApiErrorMessage from './components/ApiErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import SortControls from './components/SortControls';

import DesktopSidebar from './components/Layout/DesktopSidebar';
import ShipList from './components/ShipList';
import MobileFilterButton from './components/Layout/MobileFilterButton';
import MobileFilterModal from './components/Layout/MobileFilterModal';
import MobileSearchHeader from './components/Layout/MobileSearchHeader';
import PageHeader from './components/Layout/PageHeader';

export default function App() {
  const dispatch = useAppDispatch();
  const { loading, error, filteredShips, normalizedShips } = useAppSelector(
    (state) => state.ships
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (normalizedShips.length === 0 && !loading && !error) {
      dispatch(fetchAllData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleRetry = () => {
    dispatch(fetchAllData());
  };

  const openMobileFilters = () => setShowMobileFilters(true);
  const closeMobileFilters = () => setShowMobileFilters(false);

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading World of Warships Fleet..." />;
  }

  // Error state
  if (error) {
    return <ApiErrorMessage message={error} onRetry={handleRetry} />;
  }

  // Main app UI
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col overflow-hidden">
      <PageHeader />

      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar
          filteredCount={filteredShips.length}
          totalCount={normalizedShips.length}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Sticky Header - Search + Sort */}
          <div className="lg:hidden sticky top-0 z-20 bg-slate-900 border-b border-slate-700">
            <MobileSearchHeader
              filteredCount={filteredShips.length}
              totalCount={normalizedShips.length}
            />
            <div className="px-4 pb-4">
              <SortControls />
            </div>
          </div>

          {/* Desktop Sort Controls */}
          <div className="hidden lg:block px-4 md:px-6 pt-4 lg:pt-6">
            <SortControls />
          </div>

          <main className="flex-1 overflow-hidden p-4 md:p-6">
            <ShipList ships={filteredShips} />
          </main>
        </div>
      </div>

      <MobileFilterButton onClick={openMobileFilters} />

      <MobileFilterModal
        isOpen={showMobileFilters}
        onClose={closeMobileFilters}
      />
    </div>
  );
}
// test
// test
// test

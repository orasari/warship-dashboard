import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchAllData } from './features/ships/shipsSlice';
import ApiErrorMessage from './components/ApiErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import {
  PageHeader,
  MobileSearchHeader,
  MobileFilterButton,
  MobileFilterModal,
} from './components/Layout';
import DesktopSidebar from './components/Layout/DesktopSidebar';
import MainContent from './components/Layout/MainContent';

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

        <MobileSearchHeader
          filteredCount={filteredShips.length}
          totalCount={normalizedShips.length}
        />

        <MainContent ships={filteredShips} />
      </div>

      <MobileFilterButton onClick={openMobileFilters} />

      <MobileFilterModal
        isOpen={showMobileFilters}
        onClose={closeMobileFilters}
      />
    </div>
  );
}
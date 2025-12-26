import SearchBar from '../SearchBar';

interface MobileSearchHeaderProps {
  filteredCount: number;
  totalCount: number;
}

export default function MobileSearchHeader({ filteredCount, totalCount }: MobileSearchHeaderProps) {
  return (
    <div className="lg:hidden absolute top-20 left-0 right-0 z-10 px-4 pb-4 bg-gradient-to-b from-slate-900 to-transparent">
      <SearchBar />
      <div className="text-sm text-slate-400 mt-2">
        Showing {filteredCount} of {totalCount} ships
      </div>
    </div>
  );
}
import SearchBar from '../../SearchBar';

interface MobileSearchHeaderProps {
  filteredCount: number;
  totalCount: number;
}

export default function MobileSearchHeader({
  filteredCount,
  totalCount,
}: MobileSearchHeaderProps) {
  return (
    <div className="px-4 pt-4">
      <SearchBar />
      <div className="text-sm text-slate-400 mt-2">
        Showing {filteredCount} of {totalCount} ships
      </div>
    </div>
  );
}

import SearchBar from '../SearchBar';
import FilterPanel from '../FilterPanel';

interface DesktopSidebarProps {
  filteredCount: number;
  totalCount: number;
}

export default function DesktopSidebar({ filteredCount, totalCount }: DesktopSidebarProps) {
  return (
    <aside className="hidden lg:flex w-80 bg-slate-900/50 border-r border-slate-700 flex-col flex-shrink-0">
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
        <SearchBar />
        <div className="text-sm text-slate-400">
          Showing {filteredCount} of {totalCount} ships
        </div>
        <FilterPanel />
      </div>
    </aside>
  );
}
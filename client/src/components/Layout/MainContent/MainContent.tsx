import ShipList from '../../ShipList';
import { NormalizedShip } from '../../../types/api.types';

interface MainContentProps {
  ships: NormalizedShip[];
}

export default function MainContent({ ships }: MainContentProps) {
  return (
    <main className="flex-1 overflow-hidden p-4 md:p-6 pt-32 lg:pt-6">
      {ships.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-400 text-lg">
            No ships found matching your criteria
          </p>
        </div>
      ) : (
        <ShipList ships={ships} /> // children instead od ship list so it can be resused on other views
      )}
    </main>
  );
}
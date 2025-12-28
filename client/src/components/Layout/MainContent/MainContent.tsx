import { NormalizedShip } from '../../../types/api.types';
import ShipList from '../../ShipList';

interface MainContentProps {
  children?: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 overflow-hidden p-4 md:p-6">
       <>{children}</>
    </main>
  );
}
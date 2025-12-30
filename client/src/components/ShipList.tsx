import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { NormalizedShip } from '../types/api.types';
import ShipCard from './ShipCard';

interface ShipListProps {
  ships: NormalizedShip[];
}

export default function ShipList({ ships }: ShipListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: ships.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 360,
    overscan: 15, // Render extra items for smooth scrolling
  });

  if (ships.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400 text-lg">
          No ships found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <section
      ref={parentRef}
      className="h-full w-full overflow-y-auto overflow-x-hidden px-2"
      aria-label="Ship list"
    >
      <ul
        className="grid gap-6"
        style={{
          gridTemplateColumns:
            'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {ships.map((ship, index) => {
          const isFirstCard = index === 0;

          return (
            <li key={ship.id}>
              <ShipCard ship={ship} isFirstCard={isFirstCard} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

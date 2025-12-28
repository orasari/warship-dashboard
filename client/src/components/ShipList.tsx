import { useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { NormalizedShip } from '../types/api.types';
import ShipCard from './ShipCard';

interface ShipListProps {
  ships: NormalizedShip[];
}

// Constants for better readability and maintainability
const CARD_MIN_WIDTH = 280; // Minimum card width in pixels
const GAP = 16; // Gap between cards in pixels
const CARD_HEIGHT = 320; // Approximate card height in pixels
const ESTIMATED_ROW_HEIGHT = CARD_HEIGHT + GAP; // Total row height including gap

export default function ShipList({ ships }: ShipListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(4);

  // Calculate columns based on container width
  useEffect(() => {
    const updateColumns = () => {
      if (parentRef.current) {
        const width = parentRef.current.offsetWidth;
        const cols = Math.floor(width / (CARD_MIN_WIDTH + GAP));
        setColumnCount(Math.max(1, cols));
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Calculate card width to fill available space
  const cardWidth = parentRef.current 
    ? (parentRef.current.offsetWidth - (GAP * (columnCount - 1))) / columnCount
    : CARD_MIN_WIDTH;

  // Group ships into rows
  const rows: NormalizedShip[][] = [];
  for (let i = 0; i < ships.length; i += columnCount) {
    rows.push(ships.slice(i, i + columnCount));
  }

  // Virtualizer for rows
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 3,
  });

  return (
    <div
      ref={parentRef}
      className="h-full w-full overflow-y-auto overflow-x-hidden"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                className="flex gap-4"
                style={{ height: '100%' }}
              >
                {row.map((ship, colIndex) => {
                  // Mark first card for LCP optimization
                  const isFirstCard = virtualRow.index === 0 && colIndex === 0;
                  
                  return (
                    <div
                      key={ship.id}
                      style={{ 
                        width: `${cardWidth}px`,
                        flexShrink: 0,
                      }}
                    >
                      <ShipCard ship={ship} isFirstCard={isFirstCard} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
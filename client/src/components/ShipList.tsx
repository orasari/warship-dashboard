import { useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { NormalizedShip } from '../types/api.types';
import ShipCard from './ShipCard';

interface ShipListProps {
  ships: NormalizedShip[];
}

// Constants
const CARD_MIN_WIDTH = 280;
const GAP = 16; // Gap between cards horizontally
const CARD_HEIGHT = 320; // Base card height
const CARD_MARGIN = 16; // ShipCard has mb-4 (16px)
const ESTIMATED_ROW_HEIGHT = CARD_HEIGHT + CARD_MARGIN + 16; // Extra padding for safety

export default function ShipList({ ships }: ShipListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(4);

  // Use ResizeObserver instead of window resize listener
  useEffect(() => {
    const updateColumns = (width: number) => {
      const cols = Math.floor(width / (CARD_MIN_WIDTH + GAP));
      setColumnCount(Math.max(1, cols));
    };

    if (!parentRef.current) return;

    // Initial calculation
    updateColumns(parentRef.current.offsetWidth);

    // Performance optimization: Originally used window.addEventListener('resize')
    // which fires on every window resize and caused stuttering during responsive testing.
    // Switched to ResizeObserver which only fires when THIS container resizes,
    // providing much smoother performance while maintaining responsive column layout.
    // ResizeObserver is more efficient as it's targeted to the specific element
    // and doesn't require manual debouncing like window resize events.
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width =
          entry.contentBoxSize?.[0]?.inlineSize || entry.contentRect.width;
        updateColumns(width);
      }
    });

    resizeObserver.observe(parentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Calculate card width
  const cardWidth = parentRef.current
    ? (parentRef.current.offsetWidth - GAP * (columnCount - 1)) / columnCount
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
      className="h-full w-full overflow-y-auto overflow-x-hidden"
      aria-label="Ship list"
    >
      <ul
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          listStyle: 'none',
          margin: 0,
          padding: '16px 8px',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];

          return (
            <li
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'flex',
                gap: `${GAP}px`,
                paddingBottom: `${CARD_MARGIN}px`,
              }}
            >
              {row.map((ship, colIndex) => {
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}

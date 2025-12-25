import { useMemo } from 'react';
import { Grid } from 'react-window';
import { NormalizedShip } from '../types/api.types';
import ShipCard from './ShipCard';

interface ShipListProps {
  ships: NormalizedShip[];
}

export default function ShipList({ ships }: ShipListProps) {
  // Responsive column calculation
  const getColumnCount = (width: number) => {
    if (width >= 1536) return 4; // 2xl
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 768) return 2;  // md
    return 1; // sm
  };

  const CARD_WIDTH = 320;
  const CARD_HEIGHT = 280;
  const GAP = 16;

  // Get column count based on current window width
  const columnCount = getColumnCount(window.innerWidth);
  const rowCount = Math.ceil(ships.length / columnCount);

  // Cell renderer component for react-window v2.x
  const CellRenderer = useMemo(() => {
    return ({ columnIndex, rowIndex, style }: any) => {
      const index = rowIndex * columnCount + columnIndex;

      if (index >= ships.length) {
        return <div style={style} />;
      }

      const ship = ships[index];

      return (
        <div style={style}>
          <ShipCard ship={ship} />
        </div>
      );
    };
  }, [ships, columnCount]);

  return (
    <div style={{ height: 'calc(100vh - 120px)', minHeight: '500px', width: 'calc(100vw - 400px)' }}>
      <Grid
        cellComponent={CellRenderer}
        cellProps={{}}
        columnCount={columnCount}
        columnWidth={CARD_WIDTH + GAP}
        rowCount={rowCount}
        rowHeight={CARD_HEIGHT + GAP}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
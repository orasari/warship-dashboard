import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';
import { NormalizedShip } from '../../../types/api.types';

// Mock the ShipList component
jest.mock('../ShipList', () => {
  return function ShipList({ ships }: { ships: NormalizedShip[] }) {
    return (
      <div data-testid="ship-list">
        {ships.length} ships displayed
      </div>
    );
  };
});

// Helper to create mock ship data
const createMockShip = (id: string, name: string): NormalizedShip => ({
  id,
  name,
  displayName: name,
  description: 'Test ship',
  level: 5,
  nation: 'usa',
  nationDisplay: 'U.S.A.',
  type: 'Battleship',
  typeDisplay: 'Battleship',
  tags: [],
  icon: '/icon.png',
  isPremium: false,
  isSpecial: false,
});

describe('MainContent', () => {
  it('displays empty state message when no ships are provided', () => {
    render(<MainContent ships={[]} />);
    
    expect(screen.getByText('No ships found matching your criteria')).toBeInTheDocument();
  });

  it('does not display ShipList when there are no ships', () => {
    render(<MainContent ships={[]} />);
    
    expect(screen.queryByTestId('ship-list')).not.toBeInTheDocument();
  });

  it('displays ShipList when ships are provided', () => {
    const mockShips = [
      createMockShip('1', 'USS Iowa'),
      createMockShip('2', 'HMS Nelson'),
    ];
    
    render(<MainContent ships={mockShips} />);
    
    expect(screen.getByTestId('ship-list')).toBeInTheDocument();
  });

  it('does not display empty state message when ships are provided', () => {
    const mockShips = [createMockShip('1', 'USS Iowa')];
    
    render(<MainContent ships={mockShips} />);
    
    expect(screen.queryByText('No ships found matching your criteria')).not.toBeInTheDocument();
  });

  it('passes correct number of ships to ShipList', () => {
    const mockShips = [
      createMockShip('1', 'USS Iowa'),
      createMockShip('2', 'HMS Nelson'),
      createMockShip('3', 'Yamato'),
    ];
    
    render(<MainContent ships={mockShips} />);
    
    expect(screen.getByText('3 ships displayed')).toBeInTheDocument();
  });

  it('updates display when ships prop changes from empty to populated', () => {
    const { rerender } = render(<MainContent ships={[]} />);
    
    expect(screen.getByText('No ships found matching your criteria')).toBeInTheDocument();
    
    const mockShips = [createMockShip('1', 'USS Iowa')];
    rerender(<MainContent ships={mockShips} />);
    
    expect(screen.queryByText('No ships found matching your criteria')).not.toBeInTheDocument();
    expect(screen.getByTestId('ship-list')).toBeInTheDocument();
  });

  it('updates display when ships prop changes from populated to empty', () => {
    const mockShips = [createMockShip('1', 'USS Iowa')];
    const { rerender } = render(<MainContent ships={mockShips} />);
    
    expect(screen.getByTestId('ship-list')).toBeInTheDocument();
    
    rerender(<MainContent ships={[]} />);
    
    expect(screen.getByText('No ships found matching your criteria')).toBeInTheDocument();
    expect(screen.queryByTestId('ship-list')).not.toBeInTheDocument();
  });
});
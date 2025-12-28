import { render, screen } from '@testing-library/react';
import ShipInfo from './ShipInfo';

describe('ShipInfo', () => {
  const defaultProps = {
    displayName: 'USS Iowa',
    nationDisplay: 'U.S.A.',
    typeDisplay: 'Battleship',
  };

  it('displays ship name, nation, and type', () => {
    render(<ShipInfo {...defaultProps} />);
    
    expect(screen.getByRole('heading', { name: 'USS Iowa' })).toBeInTheDocument();
    expect(screen.getByText('U.S.A.')).toBeInTheDocument();
    expect(screen.getByText('Battleship')).toBeInTheDocument();
  });

  it('displays description when provided', () => {
    render(
      <ShipInfo 
        {...defaultProps} 
        description="A powerful battleship from World War II." 
      />
    );
    
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('A powerful battleship from World War II.')).toBeInTheDocument();
  });

  it('does not display description section when not provided', () => {
    render(<ShipInfo {...defaultProps} />);
    
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });
});
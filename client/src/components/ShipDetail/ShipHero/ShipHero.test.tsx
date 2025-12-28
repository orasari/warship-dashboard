import { render, screen } from '@testing-library/react';
import ShipHero from './ShipHero';

describe('ShipHero', () => {
  const defaultProps = {
    icon: '/ship-icon.png',
    displayName: 'USS Iowa',
    level: 9,
    isPremium: false,
    isSpecial: false,
  };

  it('displays ship image with correct alt text', () => {
    render(<ShipHero {...defaultProps} />);

    const image = screen.getByAltText('USS Iowa');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/ship-icon.png');
  });

  it('displays tier badge', () => {
    render(<ShipHero {...defaultProps} level={10} />);

    expect(screen.getByText('Tier 10')).toBeInTheDocument();
  });

  it('displays premium badge when isPremium is true', () => {
    render(<ShipHero {...defaultProps} isPremium={true} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('displays special badge when isSpecial is true and not premium', () => {
    render(<ShipHero {...defaultProps} isSpecial={true} />);

    expect(screen.getByText('Special')).toBeInTheDocument();
  });

  it('shows premium badge instead of special when both are true', () => {
    render(<ShipHero {...defaultProps} isPremium={true} isSpecial={true} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.queryByText('Special')).not.toBeInTheDocument();
  });

  it('shows no status badge for regular ships', () => {
    render(<ShipHero {...defaultProps} />);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
    expect(screen.queryByText('Special')).not.toBeInTheDocument();
  });
});

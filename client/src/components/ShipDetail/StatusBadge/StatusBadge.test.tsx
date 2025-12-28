import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  it('displays premium badge when isPremium is true', () => {
    render(<StatusBadge isPremium={true} isSpecial={false} />);
    
    expect(screen.getByText('Premium Ship')).toBeInTheDocument();
  });

  it('displays special badge when isSpecial is true', () => {
    render(<StatusBadge isPremium={false} isSpecial={true} />);
    
    expect(screen.getByText('Special Ship')).toBeInTheDocument();
  });

  it('displays standard badge when both are false', () => {
    render(<StatusBadge isPremium={false} isSpecial={false} />);
    
    expect(screen.getByText('Standard Ship')).toBeInTheDocument();
  });

  it('shows premium badge when both are true', () => {
    render(<StatusBadge isPremium={true} isSpecial={true} />);
    
    expect(screen.getByText('Premium Ship')).toBeInTheDocument();
    expect(screen.queryByText('Special Ship')).not.toBeInTheDocument();
  });
});
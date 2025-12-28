import { render, screen } from '@testing-library/react';
import DetailRow from './DetailRow';

describe('DetailRow', () => {
  it('displays the label and value', () => {
    render(<DetailRow label="Nation" value="U.S.A." />);
    
    expect(screen.getByText('Nation:')).toBeInTheDocument();
    expect(screen.getByText('U.S.A.')).toBeInTheDocument();
  });

  it('displays numeric values correctly', () => {
    render(<DetailRow label="Tier" value={10} />);
    
    expect(screen.getByText('Tier:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('displays string values correctly', () => {
    render(<DetailRow label="Type" value="Battleship" />);
    
    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getByText('Battleship')).toBeInTheDocument();
  });

  it('handles empty string values', () => {
    render(<DetailRow label="Description" value="" />);
    
    expect(screen.getByText('Description:')).toBeInTheDocument();
    // Empty value should still render (even if not visible)
    const valueElement = screen.getByText('Description:').nextElementSibling;
    expect(valueElement).toBeInTheDocument();
  });

  it('handles zero as a value', () => {
    render(<DetailRow label="Count" value={0} />);
    
    expect(screen.getByText('Count:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays mono-spaced font when mono prop is true', () => {
    render(<DetailRow label="Ship ID" value="PASC020" mono />);
    
    const valueElement = screen.getByText('PASC020');
    expect(valueElement).toHaveClass('font-mono');
  });

  it('does not display mono-spaced font by default', () => {
    render(<DetailRow label="Nation" value="U.S.A." />);
    
    const valueElement = screen.getByText('U.S.A.');
    expect(valueElement).not.toHaveClass('font-mono');
  });

  it('displays mono-spaced font when mono prop is explicitly false', () => {
    render(<DetailRow label="Nation" value="U.S.A." mono={false} />);
    
    const valueElement = screen.getByText('U.S.A.');
    expect(valueElement).not.toHaveClass('font-mono');
  });

  it('handles special characters in values', () => {
    render(<DetailRow label="Name" value="Des Moines & Co." />);
    
    expect(screen.getByText('Des Moines & Co.')).toBeInTheDocument();
  });

  it('handles very long values', () => {
    const longValue = 'This is a very long ship description that contains a lot of text';
    render(<DetailRow label="Description" value={longValue} />);
    
    expect(screen.getByText(longValue)).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import InfoCard from './InfoCard';

describe('InfoCard', () => {
  it('displays the title', () => {
    render(
      <InfoCard title="Ship Details">
        <p>Content</p>
      </InfoCard>
    );
    
    expect(screen.getByRole('heading', { name: 'Ship Details' })).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <InfoCard title="Test">
        <p>Test content</p>
        <span>Additional info</span>
      </InfoCard>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Additional info')).toBeInTheDocument();
  });
});
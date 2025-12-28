import { render, screen } from '@testing-library/react';
import DesktopSidebar from './DesktopSidebar';

// Mock the child components since we're testing DesktopSidebar in isolation
jest.mock('../../SearchBar', () => {
  return function SearchBar() {
    return <input type="text" placeholder="Search ships..." />;
  };
});

jest.mock('../../FilterPanel', () => {
  
  return function FilterPanel() {
    return <div data-testid="filter-panel">Filter Panel</div>;
  };
});

describe('DesktopSidebar', () => {
  it('displays the correct ship count summary', () => {
    render(<DesktopSidebar filteredCount={15} totalCount={100} />);

    expect(screen.getByText('Showing 15 of 100 ships')).toBeInTheDocument();
  });

  it('updates count when props change', () => {
    const { rerender } = render(
      <DesktopSidebar filteredCount={10} totalCount={50} />
    );

    expect(screen.getByText('Showing 10 of 50 ships')).toBeInTheDocument();

    // Rerender with new props
    rerender(<DesktopSidebar filteredCount={5} totalCount={50} />);

    expect(screen.getByText('Showing 5 of 50 ships')).toBeInTheDocument();
  });

  it('handles zero filtered ships', () => {
    render(<DesktopSidebar filteredCount={0} totalCount={50} />);

    expect(screen.getByText('Showing 0 of 50 ships')).toBeInTheDocument();
  });

  it('displays filter panel to users', () => {
    render(<DesktopSidebar filteredCount={10} totalCount={50} />);

    expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
  });
});

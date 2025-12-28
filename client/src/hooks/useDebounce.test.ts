import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    );
    
    expect(result.current).toBe('initial');
    
    // Change value
    rerender({ value: 'updated' });
    
    // Should still be initial (not debounced yet)
    expect(result.current).toBe('initial');
    
    // Fast-forward time with act
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Now should be updated
    expect(result.current).toBe('updated');
  });

  it('cancels previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } }
    );
    
    rerender({ value: 'second' });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    rerender({ value: 'third' });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    rerender({ value: 'final' });
    
    // Still initial value
    expect(result.current).toBe('first');
    
    // Only the last value should be set after full delay
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('final');
  });

  it('works with custom delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'start' } }
    );
    
    rerender({ value: 'end' });
    
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('start'); // Not yet
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('end'); // Now updated
  });
});
import shipsReducer, {
  setSearchQuery,
  toggleNationFilter,
  toggleTypeFilter,
  toggleLevelFilter,
  clearFilters,
  setSortBy,
  setSortDirection,
  togglePremiumFilter,
  toggleSpecialFilter,
} from './shipsSlice';
import { NormalizedShip } from '../../types/api.types';

describe('shipsSlice', () => {
  const mockShips: NormalizedShip[] = [
    {
      id: '1',
      name: 'iowa',
      displayName: 'Iowa',
      description: 'Battleship',
      level: 9,
      nation: 'usa',
      nationDisplay: 'U.S.A.',
      type: 'Battleship',
      typeDisplay: 'Battleship',
      tags: ['premium'],
      icon: '/iowa.png',
      isPremium: true,
      isSpecial: false,
    },
    {
      id: '2',
      name: 'yamato',
      displayName: 'Yamato',
      description: 'Japanese battleship',
      level: 10,
      nation: 'japan',
      nationDisplay: 'Japan',
      type: 'Battleship',
      typeDisplay: 'Battleship',
      tags: [],
      icon: '/yamato.png',
      isPremium: false,
      isSpecial: false,
    },
  ];

  const initialState = {
    ships: {},
    nations: [],
    vehicleTypes: {},
    mediaPath: '',
    normalizedShips: mockShips,
    filteredShips: mockShips,
    filters: {
      searchQuery: '',
      selectedNations: [],
      selectedTypes: [],
      selectedLevels: [],
      showPremiumOnly: false,
      showSpecialOnly: false,
    },
    sortBy: 'level' as const,
    sortDirection: 'asc' as const,
    loading: false,
    error: null,
  };

  it('filters ships by search query', () => {
    const state = shipsReducer(initialState, setSearchQuery('iowa'));
    
    expect(state.filters.searchQuery).toBe('iowa');
    expect(state.filteredShips).toHaveLength(1);
    expect(state.filteredShips[0].displayName).toBe('Iowa');
  });

  it('toggles nation filter on and off', () => {
    let state = shipsReducer(initialState, toggleNationFilter('usa'));
    expect(state.filters.selectedNations).toContain('usa');
    expect(state.filteredShips).toHaveLength(1);
    
    state = shipsReducer(state, toggleNationFilter('usa'));
    expect(state.filters.selectedNations).not.toContain('usa');
    expect(state.filteredShips).toHaveLength(2);
  });

  it('filters premium ships only', () => {
    const state = shipsReducer(initialState, togglePremiumFilter());
    
    expect(state.filters.showPremiumOnly).toBe(true);
    expect(state.filteredShips).toHaveLength(1);
    expect(state.filteredShips[0].isPremium).toBe(true);
  });

  it('turns off special filter when premium filter is enabled', () => {
    let state = { ...initialState, filters: { ...initialState.filters, showSpecialOnly: true } };
    state = shipsReducer(state, togglePremiumFilter());
    
    expect(state.filters.showPremiumOnly).toBe(true);
    expect(state.filters.showSpecialOnly).toBe(false);
  });

  it('clears all filters', () => {
    let state = shipsReducer(initialState, setSearchQuery('test'));
    state = shipsReducer(state, toggleNationFilter('usa'));
    state = shipsReducer(state, clearFilters());
    
    expect(state.filters.searchQuery).toBe('');
    expect(state.filters.selectedNations).toEqual([]);
    expect(state.filteredShips).toHaveLength(2);
  });

  it('changes sort criteria', () => {
    const state = shipsReducer(initialState, setSortBy('name'));
    
    expect(state.sortBy).toBe('name');
    expect(state.filteredShips[0].displayName).toBe('Iowa'); // Alphabetically first
  });

  it('reverses sort direction', () => {
    let state = shipsReducer(initialState, setSortBy('level'));
    state = shipsReducer(state, setSortDirection('desc'));
    
    expect(state.sortDirection).toBe('desc');
    expect(state.filteredShips[0].level).toBe(10); // Highest level first
  });
});
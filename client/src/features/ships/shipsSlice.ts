import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  ShipsData,
  Nation,
  VehicleTypesData,
  NormalizedShip,
  FilterState,
  SortOption,
  SortDirection,
} from '../../types/api.types';
import apiService from '../../services/api.service';

interface ShipsState {
  // Raw data
  ships: ShipsData;
  nations: Nation[];
  vehicleTypes: VehicleTypesData;
  mediaPath: string;

  // Normalized/processed data
  normalizedShips: NormalizedShip[];
  filteredShips: NormalizedShip[];

  // UI state
  filters: FilterState;
  sortBy: SortOption;
  sortDirection: SortDirection;

  // Loading states
  loading: boolean;
  error: string | null;
}

const initialState: ShipsState = {
  ships: {},
  nations: [],
  vehicleTypes: {},
  mediaPath: '',
  normalizedShips: [],
  filteredShips: [],
  filters: {
    searchQuery: '',
    selectedNations: [],
    selectedTypes: [],
    selectedLevels: [],
    showPremiumOnly: false,
    showSpecialOnly: false,
  },
  sortBy: 'level',
  sortDirection: 'asc',
  loading: false,
  error: null,
};

// Helper function to extract ship type from tags
const getShipType = (tags: string[]): string => {
  const types = [
    'Submarine',
    'Destroyer',
    'Cruiser',
    'Battleship',
    'AirCarrier',
  ];
  return tags.find((tag) => types.includes(tag)) || 'Unknown';
};

// Helper function to normalize ship data
const normalizeShips = (
  ships: ShipsData,
  nations: Nation[],
  vehicleTypes: VehicleTypesData,
  mediaPath: string
): NormalizedShip[] => {
  const nationMap = new Map(
    nations.map((n) => [n.name, n.localization.mark.en])
  );

  return Object.entries(ships).map(([id, ship]) => {
    const type = getShipType(ship.tags);
    const vehicleType = vehicleTypes[type];

    return {
      id,
      name: ship.name,
      displayName: ship.localization.mark.en || ship.name,
      description: ship.localization.description?.en || '',
      level: ship.level,
      nation: ship.nation,
      nationDisplay: nationMap.get(ship.nation) || ship.nation,
      type,
      typeDisplay: vehicleType?.localization.mark.en || type,
      tags: ship.tags,
      icon: mediaPath + ship.icons.medium,
      isPremium: ship.tags.includes('premium'),
      isSpecial:
        ship.tags.includes('special') || ship.tags.includes('uiSpecial'),
    };
  });
};

// Helper function to filter ships
const filterShips = (
  ships: NormalizedShip[],
  filters: FilterState
): NormalizedShip[] => {
  return ships.filter((ship) => {
    // Search query - only by name
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = ship.displayName.toLowerCase().includes(query);
      if (!matchesName) return false;
    }

    // Nations filter
    if (filters.selectedNations.length > 0) {
      if (!filters.selectedNations.includes(ship.nation)) return false;
    }

    // Types filter
    if (filters.selectedTypes.length > 0) {
      if (!filters.selectedTypes.includes(ship.type)) return false;
    }

    // Levels filter
    if (filters.selectedLevels.length > 0) {
      if (!filters.selectedLevels.includes(ship.level)) return false;
    }

    // Premium filter
    if (filters.showPremiumOnly && !ship.isPremium) return false;

    // Special filter
    if (filters.showSpecialOnly && !ship.isSpecial) return false;

    return true;
  });
};

// Helper function to sort ships
const sortShips = (
  ships: NormalizedShip[],
  sortBy: SortOption,
  sortDirection: SortDirection
): NormalizedShip[] => {
  const sorted = [...ships].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.displayName.localeCompare(b.displayName);
        break;
      case 'level':
        comparison = a.level - b.level;
        break;
      case 'nation':
        comparison = a.nationDisplay.localeCompare(b.nationDisplay);
        break;
      case 'type':
        comparison = a.typeDisplay.localeCompare(b.typeDisplay);
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

// Async thunk to fetch all data
export const fetchAllData = createAsyncThunk(
  'ships/fetchAllData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.getAllData();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch data'
      );
    }
  }
);

const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.filteredShips = sortShips(
        filterShips(state.normalizedShips, state.filters),
        state.sortBy,
        state.sortDirection
      );
    },

    toggleNationFilter: (state, action: PayloadAction<string>) => {
      const nation = action.payload;
      const index = state.filters.selectedNations.indexOf(nation);

      if (index > -1) {
        state.filters.selectedNations.splice(index, 1);
      } else {
        state.filters.selectedNations.push(nation);
      }

      state.filteredShips = sortShips(
        filterShips(state.normalizedShips, state.filters),
        state.sortBy,
        state.sortDirection
      );
    },

    toggleTypeFilter: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      const index = state.filters.selectedTypes.indexOf(type);

      if (index > -1) {
        state.filters.selectedTypes.splice(index, 1);
      } else {
        state.filters.selectedTypes.push(type);
      }

      state.filteredShips = sortShips(
        filterShips(state.normalizedShips, state.filters),
        state.sortBy,
        state.sortDirection
      );
    },

    toggleLevelFilter: (state, action: PayloadAction<number>) => {
      const level = action.payload;
      const index = state.filters.selectedLevels.indexOf(level);

      if (index > -1) {
        state.filters.selectedLevels.splice(index, 1);
      } else {
        state.filters.selectedLevels.push(level);
      }

      state.filteredShips = sortShips(
        filterShips(state.normalizedShips, state.filters),
        state.sortBy,
        state.sortDirection
      );
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredShips = sortShips(
        state.normalizedShips,
        state.sortBy,
        state.sortDirection
      );
    },

    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.filteredShips = sortShips(
        state.filteredShips,
        state.sortBy,
        state.sortDirection
      );
    },

    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
      state.filteredShips = sortShips(
        state.filteredShips,
        state.sortBy,
        state.sortDirection
      );
    },

    togglePremiumFilter: (state) => {
      state.filters.showPremiumOnly = !state.filters.showPremiumOnly;
      // Turn off Special if Premium is being turned on
      if (state.filters.showPremiumOnly) {
        state.filters.showSpecialOnly = false;
      }
      state.filteredShips = sortShips(
        filterShips(state.normalizedShips, state.filters),
        state.sortBy,
        state.sortDirection
      );
    },

    toggleSpecialFilter: (state) => {
      state.filters.showSpecialOnly = !state.filters.showSpecialOnly;
      // Turn off Premium if Special is being turned on
      if (state.filters.showSpecialOnly) {
        state.filters.showPremiumOnly = false;
      }
      state.filteredShips = sortShips(
        filterShips(state.normalizedShips, state.filters),
        state.sortBy,
        state.sortDirection
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.ships = action.payload.ships;
        state.nations = action.payload.nations;
        state.vehicleTypes = action.payload.vehicleTypes;
        state.mediaPath = action.payload.mediaPath;

        // Normalize ships
        state.normalizedShips = normalizeShips(
          action.payload.ships,
          action.payload.nations,
          action.payload.vehicleTypes,
          action.payload.mediaPath
        );

        // Apply initial filtering and sorting
        state.filteredShips = sortShips(
          filterShips(state.normalizedShips, state.filters),
          state.sortBy,
          state.sortDirection
        );
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  toggleNationFilter,
  toggleTypeFilter,
  toggleLevelFilter,
  clearFilters,
  setSortBy,
  setSortDirection,
  togglePremiumFilter,
  toggleSpecialFilter,
} = shipsSlice.actions;

export default shipsSlice.reducer;

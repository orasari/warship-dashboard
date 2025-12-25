// API Response wrapper
export interface ApiResponse<T> {
  status: 'ok' | 'error';
  data: T;
}

// Localization helper
export interface Localization {
  [locale: string]: string;
}

export interface LocalizedContent {
  mark: Localization;
  shortmark?: Localization;
  description?: Localization;
}

// Icons structure (common across entities)
export interface Icons {
  small: string;
  medium?: string;
  large: string;
  default: string;
  tiny?: string;
  local_small?: string;
  local_large?: string;
  local_tiny?: string;
  // Ship-specific icons
  contour?: string;
  contour_alive?: string;
  contour_dead?: string;
  local_contour?: string;
  local_contour_alive?: string;
  local_contour_dead?: string;
  // Vehicle type specific
  elite?: string;
  premium?: string;
  special?: string;
  normal?: string;
}

// Ship/Vehicle
export interface Ship {
  level: number;
  name: string;
  nation: string;
  tags: string[];
  icons: Icons;
  localization: LocalizedContent;
}

export interface ShipsData {
  [shipId: string]: Ship;
}

// Nation
export interface Nation {
  name: string;
  id: number;
  color: number | null;
  tags: string[];
  icons: Icons;
  localization: LocalizedContent;
}

// Vehicle Type (Cruiser, Battleship, etc.)
export interface VehicleType {
  icons: Icons;
  sort_order: number;
  localization: LocalizedContent;
}

export interface VehicleTypesData {
  [typeName: string]: VehicleType;
}

// Media Path
export type MediaPathData = string;

// Processed/Normalized types for UI
export interface NormalizedShip {
  id: string;
  name: string;
  displayName: string;
  description: string;
  level: number;
  nation: string;
  nationDisplay: string;
  type: string;
  typeDisplay: string;
  tags: string[];
  icon: string;
  isPremium: boolean;
  isSpecial: boolean;
}

// Filter state
export interface FilterState {
  searchQuery: string;
  selectedNations: string[];
  selectedTypes: string[];
  selectedLevels: number[];
}

// Sort options
export type SortOption = 'name' | 'level' | 'nation' | 'type';
export type SortDirection = 'asc' | 'desc';
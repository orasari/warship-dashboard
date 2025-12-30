import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  toggleNationFilter,
  toggleTypeFilter,
  toggleLevelFilter,
  clearFilters,
} from '../features/ships/shipsSlice';

export default function FilterPanel() {
  const dispatch = useAppDispatch();
  const { nations, vehicleTypes, filters } = useAppSelector(
    (state) => state.ships
  );

  const [expandedSections, setExpandedSections] = useState({
    nations: false,
    types: false,
    tiers: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters =
    filters.selectedNations.length > 0 ||
    filters.selectedTypes.length > 0 ||
    filters.selectedLevels.length > 0;

  // Get nation display name
  const getNationName = (nationKey: string) => {
    const nation = nations.find((n) => n.name === nationKey);
    return nation?.localization.mark.en || nationKey;
  };

  // Get type display name
  const getTypeName = (typeKey: string) => {
    return vehicleTypes[typeKey]?.localization.mark.en || typeKey;
  };

  return (
    <section className="space-y-4" aria-label="Filter panel">
      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-300 sr-only">
            Active filters
          </h3>
          <ul className="flex flex-wrap gap-1" role="list">
            {/* Nation Pills */}
            {filters.selectedNations.map((nation) => (
              <li key={`nation-${nation}`}>
                <button
                  type="button"
                  onClick={() => dispatch(toggleNationFilter(nation))}
                  className="inline-flex items-center gap-1 bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full hover:bg-blue-600/30 transition-colors"
                  aria-label={`Remove ${getNationName(nation)} filter`}
                >
                  {getNationName(nation)}
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </li>
            ))}

            {/* Type Pills */}
            {filters.selectedTypes.map((type) => (
              <li key={`type-${type}`}>
                <button
                  type="button"
                  onClick={() => dispatch(toggleTypeFilter(type))}
                  className="inline-flex items-center gap-1 bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full hover:bg-blue-600/30 transition-colors"
                  aria-label={`Remove ${getTypeName(type)} filter`}
                >
                  {getTypeName(type)}
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </li>
            ))}

            {/* Tier Pills */}
            {[...filters.selectedLevels]
              .sort((a, b) => a - b)
              .map((level) => (
                <li key={`tier-${level}`}>
                  <button
                    type="button"
                    onClick={() => dispatch(toggleLevelFilter(level))}
                    className="inline-flex items-center gap-1 bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full hover:bg-blue-600/30 transition-colors"
                    aria-label={`Remove tier ${level} filter`}
                  >
                    Tier {level}
                    <X className="w-3 h-3" aria-hidden="true" />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => dispatch(clearFilters())}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          Clear All Filters
        </button>
      )}

      {/* Nations Filter */}
      <fieldset className="border border-slate-700 rounded-lg bg-slate-800/30">
        <legend className="sr-only">Filter by nation</legend>
        {/* Header */}
        <button
          type="button"
          onClick={() => toggleSection('nations')}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-700/30 transition-colors"
          aria-expanded={expandedSections.nations}
          aria-controls="nations-content"
        >
          <span className="text-sm font-medium text-slate-200">Nations</span>
          <div className="flex items-center gap-2">
            {filters.selectedNations.length > 0 && (
              <span
                className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full"
                aria-label={`${filters.selectedNations.length} nations selected`}
              >
                {filters.selectedNations.length}
              </span>
            )}
            {expandedSections.nations ? (
              <ChevronUp
                className="w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
            ) : (
              <ChevronDown
                className="w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
            )}
          </div>
        </button>

        {/* Expanded Content */}
        {expandedSections.nations && (
          <div
            id="nations-content"
            className="p-3 pt-0 space-y-1 max-h-64 overflow-y-auto"
          >
            {nations
              .filter((nation) => !nation.tags.includes('hidden'))
              .map((nation) => (
                <label
                  key={nation.name}
                  className="flex items-center gap-2 p-2 hover:bg-slate-700/50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.selectedNations.includes(nation.name)}
                    onChange={() => dispatch(toggleNationFilter(nation.name))}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    aria-label={`Filter by ${nation.localization.mark.en}`}
                  />
                  <span className="text-sm text-slate-200">
                    {nation.localization.mark.en}
                  </span>
                </label>
              ))}
          </div>
        )}
      </fieldset>

      {/* Ship Types Filter */}
      <fieldset className="border border-slate-700 rounded-lg bg-slate-800/30">
        <legend className="sr-only">Filter by ship type</legend>
        {/* Header */}
        <button
          type="button"
          onClick={() => toggleSection('types')}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-700/30 transition-colors"
          aria-expanded={expandedSections.types}
          aria-controls="types-content"
        >
          <span className="text-sm font-medium text-slate-200">Ship Types</span>
          <div className="flex items-center gap-2">
            {filters.selectedTypes.length > 0 && (
              <span
                className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full"
                aria-label={`${filters.selectedTypes.length} types selected`}
              >
                {filters.selectedTypes.length}
              </span>
            )}
            {expandedSections.types ? (
              <ChevronUp
                className="w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
            ) : (
              <ChevronDown
                className="w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
            )}
          </div>
        </button>

        {/* Expanded Content */}
        {expandedSections.types && (
          <div id="types-content" className="p-3 pt-0 space-y-1">
            {Object.entries(vehicleTypes)
              .sort(([, a], [, b]) => a.sort_order - b.sort_order)
              .map(([key, type]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 p-2 hover:bg-slate-700/50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.selectedTypes.includes(key)}
                    onChange={() => dispatch(toggleTypeFilter(key))}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    aria-label={`Filter by ${type.localization.mark.en}`}
                  />
                  <span className="text-sm text-slate-200">
                    {type.localization.mark.en}
                  </span>
                </label>
              ))}
          </div>
        )}
      </fieldset>

      {/* Tiers Filter */}
      <fieldset className="border border-slate-700 rounded-lg bg-slate-800/30">
        <legend className="sr-only">Filter by tier</legend>
        {/* Header */}
        <button
          type="button"
          onClick={() => toggleSection('tiers')}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-700/30 transition-colors"
          aria-expanded={expandedSections.tiers}
          aria-controls="tiers-content"
        >
          <span className="text-sm font-medium text-slate-200">Tiers</span>
          <div className="flex items-center gap-2">
            {filters.selectedLevels.length > 0 && (
              <span
                className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full"
                aria-label={`${filters.selectedLevels.length} tiers selected`}
              >
                {filters.selectedLevels.length}
              </span>
            )}
            {expandedSections.tiers ? (
              <ChevronUp
                className="w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
            ) : (
              <ChevronDown
                className="w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
            )}
          </div>
        </button>

        {/* Expanded Content */}
        {expandedSections.tiers && (
          <div id="tiers-content" className="p-3 pt-0 grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((level) => (
              <label
                key={level}
                className="flex items-center gap-1 p-2 hover:bg-slate-700/50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.selectedLevels.includes(level)}
                  onChange={() => dispatch(toggleLevelFilter(level))}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  aria-label={`Filter by tier ${level}`}
                />
                <span className="text-sm text-slate-200">{level}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>
    </section>
  );
}

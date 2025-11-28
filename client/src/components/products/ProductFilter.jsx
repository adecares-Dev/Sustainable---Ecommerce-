import React from 'react';
import { Filter, X } from 'lucide-react';

const ProductFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const sustainabilityOptions = [
    { key: 'organic', label: 'Organic', description: 'Grown without synthetic pesticides' },
    { key: 'recycled', label: 'Recycled', description: 'Made from recycled materials' },
    { key: 'fairTrade', label: 'Fair Trade', description: 'Ethically sourced and produced' },
    { key: 'local', label: 'Local', description: 'Locally produced' },
    { key: 'biodegradable', label: 'Biodegradable', description: 'Naturally breaks down' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'sustainability', label: 'Best Sustainability' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: 'Over $100', min: 100, max: null }
  ];

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== false
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.label} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => {
                  onFilterChange('minPrice', range.min);
                  onFilterChange('maxPrice', range.max);
                }}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sustainability Features */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Sustainability Features
        </label>
        <div className="space-y-3">
          {sustainabilityOptions.map(option => (
            <label key={option.key} className="flex items-start">
              <input
                type="checkbox"
                checked={filters[option.key] || false}
                onChange={(e) => onFilterChange(option.key, e.target.checked)}
                className="mt-1 text-green-600 focus:ring-green-500"
              />
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-800">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.sortBy && filters.sortBy !== 'newest' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Sort: {sortOptions.find(s => s.value === filters.sortBy)?.label}
              </span>
            )}
            {filters.organic && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Organic
              </span>
            )}
            {filters.recycled && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Recycled
              </span>
            )}
            {filters.fairTrade && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                Fair Trade
              </span>
            )}
            {filters.local && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                Local
              </span>
            )}
            {filters.biodegradable && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
                Biodegradable
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
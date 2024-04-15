import React, { useState } from 'react';
import './FilterBar.css';
import PropTypes from 'prop-types';

const FilterBar = ({ onFilterChange, genres, showDates, onClear, isFilterActive, defaultFilters }) => {

  FilterBar.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
    showDates: PropTypes.array.isRequired,
    onClear: PropTypes.func.isRequired,
    isFilterActive: PropTypes.bool.isRequired,
    defaultFilters: PropTypes.object.isRequired,
  };

  const [filters, setFilters] = useState({
    genre: '',
    date: '',
    availability: '',
    sort: ''
  });

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filters">
        <select value={filters.genre} onChange={(e) => handleFilterChange('genre', e.target.value)}>
          <option value="">Select Genre</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <select value={filters.date} onChange={(e) => handleFilterChange('date', e.target.value)}>
          <option value="">Select Date</option>
          {showDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <select value={filters.availability} onChange={(e) => handleFilterChange('availability', e.target.value)}>
          <option value="">Select Ticket Availability</option>
          <option value="available">Available</option>
          <option value="sold-out">Sold Out</option>
        </select>
        <select value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
      {isFilterActive && (
        <button onClick={() => { onClear(); setFilters(defaultFilters); }}
          className="clear-filters-btn">
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;

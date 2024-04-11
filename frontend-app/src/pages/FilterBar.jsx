import React, { useState } from 'react';
import './FilterBar.css'; // Make sure to create this CSS file for styling

const FilterBar = ({ onFilterChange }) => {
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState('');
  const [availability, setAvailability] = useState('');
  const [sort, setSort] = useState('');

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'genre':
        setGenre(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'availability':
        setAvailability(value);
        break;
      case 'sort':
        setSort(value);
        break;
      default:
        break;
    }

    onFilterChange({ genre, date, availability, sort, [filterType]: value });
  };

  return (
    <div className="filter-bar">
      <div className="filters">
        <select onChange={(e) => handleFilterChange('genre', e.target.value)}>
          <option value="">Select Genre</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="romance">Romance</option>
        </select>
        <select onChange={(e) => handleFilterChange('date', e.target.value)}>
          <option value="">Select Date</option>
          {/* Populate with dates */}
        </select>
        <select onChange={(e) => handleFilterChange('availability', e.target.value)}>
          <option value="">Ticket Availability</option>
          <option value="available">Available</option>
          <option value="sold-out">Sold Out</option>
          <option value="coming-soon">Coming Soon</option>
          <option value="pre-order">Pre-order</option>
        </select>
        <select onChange={(e) => handleFilterChange('sort', e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

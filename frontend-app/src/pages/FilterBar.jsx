import React, { useState } from 'react';
import './FilterBar.css'; // Make sure to create this CSS file for styling

const FilterBar = ({ onFilterChange, genres, showDates }) => {
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
          {genres.map(genre => (
            <option key={genre} value={genre.toLowerCase()}>{genre}</option>
          ))}
        </select>
        <select onChange={(e) => handleFilterChange('date', e.target.value)}>
          <option value="">Select Date</option>
          {showDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <select onChange={(e) => handleFilterChange('availability', e.target.value)}>
          <option value="">Ticket Availability</option>
          <option value="available">Available</option>
          <option value="sold-out">Sold Out</option>
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterBar from './FilterBar';
import './HomePage.css';
import loader from '../assets/images/loading.gif';
import API_URLS from '../config';
import { filterByGenre, filterByDate, filterByAvailability, sortByPrice } from '../utils/filterFunctions';
import PropTypes from 'prop-types';

const ShowCard = ({ shows }) => {
  if (shows.length === 0) {
    return (
      <div className="no-shows">
        No shows found.
      </div>
    );
  }
  return shows.map(show => (
    <Link key={show.showId} to={`/movie/${show.showId}`} className="movie-card-link" state={
      {
        data: show
      }
    }>
      <div key={show.showId} className="movie-card">
        {/* temporary image url if no poster image exists */}
        <img src={show?.posterURL || 'https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg'}
          alt={show.showName} />
        <h3>{show.showName}</h3>
      </div>
    </Link>
  ));
};

const LoadingComponent = () => (
  <div className="loader">
    <img src={loader} alt="page is loading"></img>
  </div>
);

const ErrorComponent = ({ message }) => (
  <div className="loader">
    <div className="error">{message}</div>
  </div>
);
// Prop types for the components helps with type checking
ShowCard.propTypes = {
  shows: PropTypes.array.isRequired,
};

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

const HomePage = () => {
  const [shows, setShows] = useState([]);
  const [originalShows, setOriginalShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showDates, setShowDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const defaultFilters = {
    genre: '',
    date: '',
    availability: '',
    sort: '',
  };
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    // set loading to true before making API calls
    setLoading(true);
    const fetchData = async () => {
      try {
        const [shows, genres, showDates] = await Promise.all([
          axios.get(API_URLS.getAllShows),
          axios.get(API_URLS.getAllGenres),
          axios.get(API_URLS.getShowDates),
        ]);
        setShows(shows.data);
        setOriginalShows(shows.data); // save the original list of shows for filtering purposes
        setGenres(genres.data);
        setShowDates(showDates.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (newFilters) => {
    // merge new filters with existing filters and update the state
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setShows(originalShows);
  };

  const isFilterActive = () => {
    return filters.genre !== '' || filters.date !== '' || filters.availability !== '' || filters.sort !== '';
  };

  useEffect(() => {
    if (filters.genre || filters.date || filters.availability || filters.sort) {
      setLoading(true);
      try {
        let filteredShows = originalShows;
        filteredShows = filterByGenre(filteredShows, filters.genre);
        filteredShows = filterByDate(filteredShows, filters.date);
        filteredShows = filterByAvailability(filteredShows, filters.availability);
        if (filters.sort) {
          filteredShows = sortByPrice(filteredShows, filters.sort);
        }
        setShows(filteredShows);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, [filters, originalShows]);

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error.message} />;

  return (
    <>
      <FilterBar
        genres={genres}
        showDates={showDates}
        onFilterChange={handleFilterChange}
        onClear={() => clearFilters()}
        isFilterActive={isFilterActive()}
        defaultFilters={defaultFilters}
      />
      <div className="movies-container">
        <ShowCard shows={shows} />
      </div>
    </>
  )
}

export default HomePage;

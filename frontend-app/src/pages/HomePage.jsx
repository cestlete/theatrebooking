import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterBar from './FilterBar';
import './HomePage.css';
import loader from '../assets/images/loading.gif';
import API_URLS from '../config';

export default function HomePage() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showDates, setShowDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genre: '',
    date: '',
    availability: '',
    sort: '',
  });

  useEffect(() => {
    // Set loading to true before making API calls
    setLoading(true);

    const fetchData = async () => {
      try {
        const [shows, genres, showDates] = await Promise.all([
          axios.get(API_URLS.getAllShows),
          axios.get(API_URLS.getAllGenres),
          axios.get(API_URLS.getShowDates),
        ]);
        setShows(shows.data);
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

  if (loading) {
    return (
      <div className="loader">
        <img src={loader} alt="page is loading"></img>
      </div>
    )
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // TODO: make API calls to update the shows list based on the filters selected
  };

  return (
    <>
      <FilterBar genres={genres} showDates={showDates} onFilterChange={handleFilterChange} />
      <div className="movies-container">
        {shows.map(show => (
          <Link key={show._id} to={`/movie/${show._id}`} className="movie-card-link" state={
            {
              data: show
            }

          }>
            <div key={show._id} className="movie-card">
              <img src={show?.posterURL || 'https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg'} alt={show.showName} />
              <h3>{show.showName}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

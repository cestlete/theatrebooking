import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterBar from './FilterBar';
import './HomePage.css';
import loader from '../assets/images/loading.gif';
import API_URLS from '../config';

export default function HomePage() {
  const [shows, setShows] = useState([]);
  const [originalShows, setOriginalShows] = useState([]);
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

  // apply filters whenever they change
  useEffect(() => {
    if (filters.genre || filters.date || filters.availability || filters.sort) {
      setLoading(true);
      try {
        const filteredShows = originalShows
          .filter(show => {
            return filters.genre ? show.genre.includes(filters.genre) : true;
          })
          .filter(show => {
            return filters.date ? show.session.some(session => session.date === filters.date) : true;
          })
          .filter(show => {
            if (filters.availability === 'available') {
              return show.session.some(session => session.ticketsAvailability.some(ticket => ticket.remain > 0));
            } else if (filters.availability === 'sold-out') {
              return show.session.every(session => session.ticketsAvailability.every(ticket => ticket.remain === 0));
            }
            return true;
          })
          .sort((a, b) => {
            if (filters.sort === 'low-high') {
              return a.session[0].ticketsAvailability[0].price - b.session[0].ticketsAvailability[0].price;
            } else if (filters.sort === 'high-low') {
              return b.session[0].ticketsAvailability[0].price - a.session[0].ticketsAvailability[0].price;
            }
            return 0;
          });
        setShows(filteredShows);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, [filters]); // update whenever filters change

  if (loading) {
    return (
      <div className="loader">
        <img src={loader} alt="page is loading"></img>
      </div>
    )
  }

  return (
    <>
      <FilterBar genres={genres} showDates={showDates} onFilterChange={handleFilterChange} />
      <div className="movies-container">
        {shows.map(show => (
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
        ))}
      </div>
    </>
  )
}

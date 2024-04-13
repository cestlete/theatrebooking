import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterBar from './FilterBar';
import './HomePage.css';
import loading from '../assets/images/loading.gif';

export default function HomePage() {
  const [shows, setShows] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    date: '',
    availability: '',
    sort: '',
  });

  const URL = 'https://mock-api.driven.com.br/api/v2/cineflex/movies';

  useEffect(() => {
    axios.get(URL)
      // .then((response) => response.json()) // Original API response could be different commenting it for later
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  if (shows.length === 0) {
    return (
      <div className="loader">
        <img src={loading} alt="page is loading"></img>
      </div>
    )
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // TODO: make API calls to update the shows list based on the filters selected
  };

  return (
    <>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="movies-container">
        {shows.map(show => (
          <Link key={show.id} to={`/movie/${show.id}`} className="movie-card-link" state={
            {
              data: show
            }

          }>
            <div key={show.id} className="movie-card">
              <img src={show.posterURL} alt={show.title} />
              <h3>{show.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

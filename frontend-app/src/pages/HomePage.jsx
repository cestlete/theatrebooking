import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterBar from './FilterBar';
import './HomePage.css';
import loading from '../assets/images/loading.gif';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
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
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  if (movies.length === 0) {
    return (
      <div className="loader">
        <img src={loading} alt="page is loading"></img>
      </div>
    )
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // TODO: make API calls to update the movies list based on the filters selected
  };

  return (
    <>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="movies-container">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card-link">
            <div key={movie.id} className="movie-card">
              <img src={movie.posterURL} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

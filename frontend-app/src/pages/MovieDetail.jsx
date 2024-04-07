import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
  // let { id } = useParams();
  // Fetch movie details based on the `id`

  const movie = {
    title: "The God Father",
    languages: ["English", "Hindi"],
    duration: "2h 13m",
    genre: "Action Thriller",
    rating: "UA",
    description: "The Godfather is a trilogy of American crime films directed by Francis Ford Coppola inspired by the 1969 novel of the same name by Italian American author Mario Puzo.",
    posterSrc: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
  };

  return (
    <div className="movie-detail">
      <img className="movie-image" src='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg'/>
      <div className="movie-content">
        <h1 className="movie-title">{movie.title}</h1>
        <div className="movie-info">
          <div>{movie.languages.join(", ")}</div>
          <div>{movie.duration}</div>
          <div className="movie-genre">{movie.genre}</div>
          <div className="movie-rating">{movie.rating}</div>
        </div>
        <h2>About the movie</h2>
        <p>{movie.description}</p>
        <button className="btn">Book Tickets</button>
      </div>
    </div>
  );
};

export default MovieDetail;

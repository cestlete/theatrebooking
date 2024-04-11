import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
	// let { id } = useParams();
	// Fetch movie details based on the `id`

	const movie = {
		id: 1,
		title: 'The God Father',
		languages: ['English', 'Hindi'],
		duration: '2h 13m',
		genre: 'Action Thriller',
		rating: 'UA',
		description: 'The Godfather is a trilogy of American crime films directed by Francis Ford Coppola inspired by the 1969 novel of the same name by Italian American author Mario Puzo.',
		posterSrc: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
	};

	return (
		<div className='movie-detail'>
			<img className='movie-image' src='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg' alt={movie.title} />
			<div className='movie-content'>
				<h1 className='movie-title'>{movie.title}</h1>
				<div className='movie-info'>
					<div className='language'>{movie.languages.join(', ')}</div>
					<div className='duration'>{movie.duration}</div>
					<div className='genre'>{movie.genre}</div>
					<div className='rating'>{movie.rating}</div>
				</div>
				<h2>About the movie</h2>
				<p className='description'>{movie.description}</p>
				<div className='btn-container'>
					<Link to={`/booking/${movie.id}`} className='btn'>Book Tickets</Link>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;

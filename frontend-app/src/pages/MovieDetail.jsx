import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { data } = location.state || {};
	// Use data instead of show. Change from show. to data.
	// console.log(data);

	const show = {
		id: 1,
		title: "The God Father",
		languages: ["English", "Hindi"],
		duration: "2h 13m",
		genre: "Action Thriller",
		rating: "UA",
		description: "The Godfather is a trilogy of American crime films directed by Francis Ford Coppola inspired by the 1969 novel of the same name by Italian American author Mario Puzo.",
		posterSrc: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
		ticketsAvailability: {
			"2024-05-17": [
				{
					"price": 55.75,
					"remain": 40
				},
				{
					"price": 50.20,
					"remain": 25
				}
			],
			"2024-05-18": [
				{
					"price": 49.80,
					"remain": 18
				},
				{
					"price": 45.50,
					"remain": 12
				}
			]
		}
	};

	const handleSubmit = () => {
		navigate(`/booking/${show.id}`, {
			state: {
				data: show
			}
		});
	};

	return (
		<div className='movie-detail'>
			<img className='movie-image' src='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg' alt={show.title} />
			<div className='movie-content'>
				<h1 className='movie-title'>{show.title}</h1>
				<div className='movie-info'>
					<div className='language'>{show.languages.join(', ')}</div>
					<div className='duration'>{show.duration}</div>
					<div className='genre'>{show.genre}</div>
					<div className='rating'>{show.rating}</div>
				</div>
				<h2>About the movie</h2>
				<p className='description'>{show.description}</p>
				<div className='btn-container'>
					<button className='btn' onClick={() => handleSubmit()}>Book Tickets</button>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;

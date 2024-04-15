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
		id: data.ShowId,
		title: data.showName,
		genre: data.genre,
		description: data.briefDescription,
		posterSrc: data.posterURL,
		ticketsAvailability: data.session.map(session => ({
			date: session.date,
			tickets: session.ticketsAvailability.map(ticket => ({
				price: ticket.price,
				remain: ticket.remain
			}))
		}))
	};

	const handleSubmit = () => {
		navigate(`/booking/${data.showName}`, {
			state: {
				data: show
			}
		});
	};

	return (
		<div className='movie-detail'>
			<img src={data.posterURL || 'https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg'} alt={data.showName} />
			<div className='movie-content'>
				<h1 className='movie-title'>{show.title}</h1>
				<div className='movie-info'>
					<ul className='genre'>{data.genre.map((genre, index) => (
						<li key={index}>{genre}</li> // Using the index as a key here; ideally, use a unique ID if available
					))}</ul>
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

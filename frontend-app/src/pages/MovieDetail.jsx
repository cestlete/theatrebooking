import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { data } = location.state || {};

	const formatSessions = (sessions) => {
		return sessions.map(({ date, ticketsAvailability }) => ({
			date,
			tickets: ticketsAvailability.map(({ price, remain }) => ({
				price,
				remain
			}))
		}));
	};

	const show = data ? {
		id: data.showId, // ensure the property name is consistent (ShowId vs showId)
		title: data.showName,
		genre: data.genre,
		description: data.briefDescription,
		posterSrc: data.posterURL,
		ticketsAvailability: formatSessions(data.session),
		_id: data._id
	} : {};

	const handleSubmit = () => {
		navigate(`/booking/${data.showId}`, {
			state: {
				data: show
			}
		});
	};

	const buttonClass = data.hasAvailability ? 'btn' : 'btn disabled';

	return (
		<div className='movie-detail'>
			<img className='movie-image' src={data.posterURL || 'https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg'} alt={data.showName} />
			<div className='movie-content'>
				<h1 className='movie-title'>{show.title}</h1>
				<div className='movie-info'>
					<div className='genre-container'>{data.genre.map((genre, index) => (
						<p className='genre' key={index + 1}>{genre}</p> // Using the index as a key here; ideally, use a unique ID if available
					))}</div>
				</div>
				<h2>About the movie</h2>
				<p className='description'>{show.description}</p>
				<div className='btn-container'>
					<button className={buttonClass} onClick={() => handleSubmit()} disabled={!data.hasAvailability}>
						{data.hasAvailability ?
							"Book Tickets" : "Tickets Sold Out"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;

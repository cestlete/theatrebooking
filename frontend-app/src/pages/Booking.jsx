import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Booking.css';

const Booking = ({ shows }) => {
  const { id } = useParams();
    // TODO: API call or pass data from previous page?
    const show = {
    id: 1,
    title: "The God Father",
    languages: ["English", "Hindi"],
    duration: "2h 13m",
    genre: "Action Thriller",
    rating: "UA",
    description: "The Godfather is a trilogy of American crime films directed by Francis Ford Coppola inspired by the 1969 novel of the same name by Italian American author Mario Puzo.",
    posterSrc: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
    prices: [12, 18, 22],
    availableTickets: 100
  };
  const [selectedPrice, setSelectedPrice] = useState(show.prices[0]);
  const [quantity, setQuantity] = useState(1);

  const handleBooking = () => {
    // TODO: API call to process the booking
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1 className="booking-title">Book Tickets for {show.title}</h1>
        <div className="booking-details">
          <p className="booking-info">{show.genre} | {show.duration} | Rated {show.rating}</p>
          <p className="booking-description">{show.description}</p>
          <div className="price-selection">
            <label htmlFor="price">Select Price: </label>
            <select id="price" value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)}>
              {show.prices.map((price, index) => (
                <option key={index} value={price}>€{price}</option>
              ))}
            </select>
          </div>
          <div className="quantity-selection">
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" id="quantity" min="1" max={show.availableTickets} value={quantity} onChange={e => setQuantity(e.target.value)} />
          </div>
          <button className="book-btn" onClick={handleBooking}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;

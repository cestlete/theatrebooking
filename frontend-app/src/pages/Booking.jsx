import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Booking.css';

const Booking = () => {
  const navigate = useNavigate();

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

  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  const [selectedDate, setSelectedDate] = useState(Object.keys(show.ticketsAvailability)[0]);
  const ticketOptions = show.ticketsAvailability[selectedDate];
  const [selectedTicketOption, setSelectedTicketOption] = useState(ticketOptions[0]);
  const [selectedPrice, setSelectedPrice] = useState(selectedTicketOption.price);
  const [quantity, setQuantity] = useState(1);
  const totalPrice = selectedPrice * quantity;
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleDateChange = (newDate) => {
    const newTicketOptions = show.ticketsAvailability[newDate];
    setSelectedDate(newDate);
    setSelectedTicketOption(newTicketOptions[0]);
    setSelectedPrice(newTicketOptions[0].price);
    setQuantity(1); // resetting the quantity when date changes
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    const newTicketOption = ticketOptions.find(option => option.price === newPrice);
    setSelectedTicketOption(newTicketOption);
    setSelectedPrice(newPrice);
    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };
  const maxQuantity = selectedTicketOption.remain;
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full name is required';
      formIsValid = false;
    }

    // You can add additional validation logic for mobile and email here
    if (!mobile.trim()) {
      errors.mobile = 'Mobile number is required';
      formIsValid = false;
    }

    if (!email.trim()) {
      errors.email = 'Email address is required';
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const formIsValid = validateForm();
    console.log(formIsValid, errors);
    if (!formIsValid) {
      return; // Prevent further actions if the form is invalid
    }
    console.log(`Booked ${quantity} ticket(s) for ${selectedPrice} each on ${selectedDate}`);
    console.log(`Total Price: ${totalPrice}`, `Full Name: ${fullName}`, `Mobile: ${mobile}`, `Email: ${email}`);
    // uncomment to redirect to confirmation page once booking is confirmed
    navigate('/booking-confirmation', {
      state: {
        type: 'success',
      }
    });

  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1 className="booking-title">Book Tickets for <br />{show.title}</h1>
        <div className="booking-details">
          <p className="booking-info">{show.genre} | {show.duration} | Rated {show.rating}</p>
          <p className="booking-description">{show.description}</p>
          <div className="date-selection">
            <label htmlFor="date">Select Date:</label>
            <select id="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)}>
              {Object.keys(show.ticketsAvailability).map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
          <div className="price-selection">
            <label htmlFor="price">Select Price:</label>
            <select id="price" value={selectedPrice} onChange={(e) => handlePriceChange(e)}>
              {show.ticketsAvailability[selectedDate].map((option, index) => (
                <option key={index + 1} value={option.price}>€{option.price}</option>
              ))}
            </select>
          </div>
          <div className="quantity-selection">
            <label htmlFor="quantity">Quantity:</label>
            <select id="quantity" value={quantity} onChange={handleQuantityChange}>
              {quantityOptions.map(qty => (
                <option key={qty} value={qty}>{qty}</option>
              ))}
            </select>
          </div>
          <div className="user-details">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              name="fullName"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Eg: Anna Smith"
              required
            />
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Eg: +3538776544"
              required
            />
            {errors.mobile && <div className="error-message">{errors.mobile}</div>}
            <label htmlFor="mobile">Email Address:</label>
            <input
              type="email"
              name="email"
              value={email}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Eg: anna@yahoo.com"
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <button className="book-btn" onClick={handleBooking}>
            Book {quantity} Ticket(s) for €{totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;

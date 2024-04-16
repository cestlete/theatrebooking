import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import API_URLS from '../config';
import './Booking.css';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {
    title: "",
    genre: [],
    description: "",
    ticketsAvailability: [],
    _id: ""
  };

  const [selectedDate, setSelectedDate] = useState(data.ticketsAvailability.length > 0 ? data.ticketsAvailability[0].date : '');
  const [selectedTicketOption, setSelectedTicketOption] = useState(data.ticketsAvailability.length > 0 && data.ticketsAvailability[0].tickets.length > 0 ? data.ticketsAvailability[0].tickets[0] : { price: 0, remain: 0 });
  const [selectedPrice, setSelectedPrice] = useState(selectedTicketOption.price);
  const [quantity, setQuantity] = useState(1);
  const totalPrice = selectedPrice * quantity;
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const handleDateChange = (newDate) => {
    const newTicketOptions = data.ticketsAvailability.find(day => day.date === newDate).tickets;
    setSelectedDate(newDate);
    setSelectedTicketOption(newTicketOptions[0]);
    setSelectedPrice(newTicketOptions[0].price);
    setQuantity(1);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    const newTicketOption = data.ticketsAvailability.find(day => day.date === selectedDate).tickets.find(option => option.price === newPrice);
    setSelectedTicketOption(newTicketOption);
    setSelectedPrice(newPrice);
    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const maxQuantity = selectedTicketOption.remain;
  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full name is required';
      formIsValid = false;
    }

    if (!mobile.trim()) {
      errors.mobile = 'Mobile number is required';
      formIsValid = false;
    }

    if (!address.trim()) {
      errors.address = 'Address is required';
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleBooking = async (e) => {
    // take the parameters required to book the tickets from state 
    // and navigate to the booking confirmation page
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const bookingData = {
      showId: data._id,
      date: selectedDate,
      price: selectedPrice,
      ticketsBooked: quantity,
      bookingDetails: {
        name: fullName,
        address: address,
        phoneNumber: mobile,
        date: selectedDate,
        price: selectedPrice,
        showName: data.title,
        ticketsBooked: quantity
      }
    };

    try {
      const response = await axios.post(API_URLS.bookTicket, bookingData);
      navigate('/booking-confirmation', {
        state: {
          type: response.data.type,
          booking: response.data.booking
        }
      });
    } catch (error) {
      alert('Error booking the show. Please try again later.');
      console.error('Error booking the show:', error);
    }
  };

  const ShowDetailsComponent = () => {
    return (
      <>
        <h1 className="booking-title">Book Tickets for <br />{data.title}</h1>
        <p className="booking-info">{data.genre.join(', ')} | Rated PG-13</p>
        <p className="booking-description">{data.description}</p>
        <div className="date-selection">
          <label htmlFor="date">Select Date:</label>
          <select id="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)}>
            {data.ticketsAvailability.map((day) => (
              <option key={day.date} value={day.date}>{day.date}</option>
            ))}
          </select>
        </div>
      </>
    );
  };

  const PriceSelectionComponent = () => {
    return (
      <div className="price-selection">
        <label htmlFor="price">Select Price:</label>
        <select id="price" value={selectedPrice} onChange={(e) => handlePriceChange(e)}>
          {quantityOptions.length === 0 ? <option value={0}>Sold Out</option> :
            data.ticketsAvailability.find(day => day.date === selectedDate)?.tickets.map((option, index) => (
              <option key={index + 1} value={option.price}>€{option.price}</option>
            ))}
        </select>
      </div>
    );
  }

  const QuantitySelectionComponent = () => {
    return (
      <div className="quantity-selection">
        <label htmlFor="quantity">Quantity:</label>
        <select id="quantity" value={quantity} onChange={handleQuantityChange}>
          {quantityOptions.length === 0 ? <option value={0}>Sold Out</option> :
            quantityOptions.map(qty => (
              <option key={qty} value={qty}>{qty}</option>
            ))}
        </select>
      </div>
    );
  };

  const UserDetailsForm = () => {
    return (
      <>
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
          <label htmlFor="mobile">Address:</label>
          <input
            type="address"
            name="address"
            value={address}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Eg: Maynooth, Co. Kildare, Ireland"
            required
          />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
        <button className="book-btn" onClick={handleBooking}>
          Book {quantity} Ticket(s) for €{totalPrice.toFixed(2)}
        </button>
      </>
    );
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-details">
          <ShowDetailsComponent />
          <PriceSelectionComponent />
          <QuantitySelectionComponent />
          <UserDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default Booking;

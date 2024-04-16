import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const { type, booking } = location.state || {};
  return (
    <>
      {type === "success" ? (
        <div className="booking-message booking-success">
          <h1>Booking Successful!</h1><p>Your tickets have been booked.</p>
          <p>Ticket details are:</p>
          <div className="ticket-details">
            <p><b>Show:</b> {booking.showName}</p>
            <p><b>Date:</b> {booking.date}</p>
            <p><b>Quantity:</b> {booking.ticketsBooked}</p>
            <p><b>Price:</b> €{booking.price * booking.ticketsBooked}</p>
          </div>
          <p>Thank you for booking with us. To book new tickets, please click on the button below</p>
          <Link to="/" className="home-link">Book new tickets</Link>
        </div>

      ) : (
        <div className="booking-message booking-failure">
          <h1>Booking Failure!</h1><p>Your tickets could not be booked.</p>
          <p>Please try again later. If your money has been deducted <br />it will be refunded to the
            source in 2 working days</p>
          <Link to="/" className="home-link">Try again</Link>
        </div>
      )}
    </>

  );
};

export default BookingConfirmation;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = ({ }) => {
  const location = useLocation();
  const { type } = location.state || {};
  console.log(location.state);
  return (
    <>
      {type === "success" ? (
        <div className="booking-message booking-success">
          <h1>Booking Successful!</h1><p>Your tickets have been booked.</p>
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

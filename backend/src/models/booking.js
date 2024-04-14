/**
 * Description:
 * This file defines the Mongoose schema and model for managing booking information.
 * The Booking model is exported to be used in other parts of the application.
 */

const mongoose = require('mongoose');

const bookingInfoSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNumber: String,
  date: String,
  price: Number,
  showName: String,
  ticketsBooked: Number
});

const Booking = mongoose.model('BookingInfo', bookingInfoSchema, 'bookingInfo');

module.exports = Booking;

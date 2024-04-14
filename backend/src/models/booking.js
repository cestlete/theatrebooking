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

const mongoose = require('mongoose');

const ticketsAvailabilitySchema = new mongoose.Schema({
  price: Number,
  remain: Number
});

const sessionSchema = new mongoose.Schema({
  date: String,
  ticketsAvailability: [ticketsAvailabilitySchema]
});

const showSchema = new mongoose.Schema({
  showName: String,
  genre: [String],
  briefDescription: String,
  session: [sessionSchema]
});

const Show = mongoose.model('NowShowing', showSchema, 'nowShowing');
module.exports = Show;

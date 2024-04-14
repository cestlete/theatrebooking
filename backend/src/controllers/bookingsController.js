const Booking = require('../models/booking');
const Show = require('../models/show');

exports.getBookingDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.bookShow = async (req, res) => {
  const { showId, date, price, ticketsBooked, bookingDetails } = req.body;
  try {
    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ error: 'Show not found' });

    let remainUpdated = false;
    show.session.forEach(session => {
      if (session.date === date) {
        session.ticketsAvailability.forEach(ticket => {
          if (ticket.price === parseFloat(price) && (ticket.remain - ticketsBooked >= 0)) {
            ticket.remain -= ticketsBooked;
            remainUpdated = true;
          }
        });
      }
    });

    if (!remainUpdated) return res.status(400).json({ type: 'failure', error: 'Not enough tickets available or wrong price' });

    await show.save();
    const booking = await Booking.create(bookingDetails);
    res.status(201).json({ type: 'success', message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error making booking:', error);
    res.status(500).json({ type: 'failure', error: 'Internal Server Error' });
  }
};

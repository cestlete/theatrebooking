/**
 * Description: Controller for booking-related operations.
 */

const Booking = require('../models/booking');
const Show = require('../models/show');

/**
 * Retrieves booking details by ID.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object 
 * @returns {Object} - JSON response with booking details or error message 
 */
exports.getBookingDetails = async (req, res) => {
  const { id } = req.params; // Extract 'id' from request parameters
  try {
    const booking = await Booking.findById(id); // try retrieve booking from database
    if (!booking) {
      // if no booking found
      return res.status(404).json({ error: 'Booking not found' });
    }
    // otherwise, return booking as JSON
    res.json(booking);
  } catch (error) {
    // Log any errors if they occour
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Books a show by updating ticket availability and creating a booking record.
 * Only saves the booking record if updating the remaining tickets is successful.
 *
 * @param {Object} req - Express request object containing showId, date, price, ticketsBooked, and bookingDetails
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating success or failure of booking creation
 */
exports.bookShow = async (req, res) => {
  const { showId, date, price, ticketsBooked, bookingDetails } = req.body; // USe required fields from body
  try {
    const show = await Show.findById(showId); // Retrieve show using 'showId'
    if (!show) return res.status(404).json({ error: 'Show not found' });

    let remainUpdated = false; // Track if ticket availability has been updated
    show.session.forEach(session => {
      if (session.date === date) {
        // Check for specific date in 'session'
        session.ticketsAvailability.forEach(ticket => {
          // Iterate over ticket types for that date
          if (ticket.price === parseFloat(price) && (ticket.remain - ticketsBooked >= 0)) {
            // Update ticket count if there are tickets available 
            ticket.remain -= ticketsBooked;
            remainUpdated = true;
          }
        });
      }
    });

    if (!remainUpdated) return res.status(400).json({ type: 'failure', error: 'Not enough tickets available or wrong price' });
     // if update failed return status 400
    await show.save(); // Save updated show
    const booking = await Booking.create(bookingDetails); // Create new booking record
    res.status(201).json({ type: 'success', message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error making booking:', error);
    res.status(500).json({ type: 'failure', error: 'Internal Server Error' });
  }
};

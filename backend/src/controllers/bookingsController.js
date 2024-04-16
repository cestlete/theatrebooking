/**
 * Description: Controller for booking-related operations.
 */

const Booking = require('../models/booking');
const Show = require('../models/show');

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Retrieve all booking IDs
 *     description: Retrieve all booking IDs
 *     responses:
 *       200:
 *         description: List of booking IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * Retrieves all booking IDs.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object 
 * @returns {Object} - JSON response with booking IDs or error message 
 */

exports.getAllBookings = async (req, res) => {
  try {
    // Retrieve all bookings from the database
    const bookings = await Booking.find();
    res.json(bookings); // Return all bookings
  } catch (error) {
    console.error('Error fetching bookings:', error);
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a show
 *     description: Book a show by providing show ID, date, price, number of tickets booked, and booking details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *               ticketsBooked:
 *                 type: integer
 *               bookingDetails:
 *                 $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Booking created successfully
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Not enough tickets available or wrong price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: failure
 *                 error:
 *                   type: string
 *                   example: Not enough tickets available or wrong price
 *       404:
 *         description: Show not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Show not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: failure
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */


/**
 * Books a show by updating ticket availability and creating a booking record.
 * Only saves the booking record if updating the remaining tickets is successful.
 *
 * @param {Object} req - Express request object containing showId, date, price, ticketsBooked, and bookingDetails
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating success or failure of booking creation
 */

// Define a variable to track if booking is in progress
let operating = false;

exports.bookShow = async (req, res) => {
  // Use required fields from body
  const { showId, date, price, ticketsBooked, bookingDetails } = req.body; 
  try {
    // Check if there is an ongoing booking process
    if (operating) {
      return res.status(400).json({ type: 'failure', error: 'Please try again later' });
    }

    // Set booking in progress, start booking process
    operating = true;

    // Retrieve show using 'showId'
    const show = await Show.findById(showId); 
    if (!show) return res.status(404).json({ error: 'Show not found' });

    // Track if ticket availability has been updated
    let remainUpdated = false; 
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

    // If update failed return status 400
    if (!remainUpdated) return res.status(400).json({ type: 'failure', error: 'Not enough tickets available or wrong price' });
    // Otherwise, save updated show
    await show.save(); 
    // Create new booking record
    const booking = await Booking.create(bookingDetails); 
    // Return success message and booking record
    res.status(201).json({ type: 'success', message: 'Booking created successfully', booking });

    // Set booking process as complete after all the business logic is done
    operating = false;
  } catch (error) {
    console.error('Error making booking:', error);
    res.status(500).json({ type: 'failure', error: 'Internal Server Error' });
  }
};

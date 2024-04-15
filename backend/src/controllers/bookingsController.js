/**
 * Description: Controller for booking-related operations.
 */

const Booking = require('../models/booking');
const Show = require('../models/show');

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Retrieve booking details by ID
 *     description: Retrieve booking details by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Booking not found
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
 * Retrieves booking details by ID.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object 
 * @returns {Object} - JSON response with booking details or error message 
 */
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

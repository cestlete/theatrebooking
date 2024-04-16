/**
 * Description:
 * This file defines the routes for handling booking-related requests.
 * It creates an Express router, assigns routes for retrieving booking details and booking a show,
 * and connects these routes to corresponding controller functions.
 * The router is then exported to be mounted in the main Express application.
 */

const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.get('/bookings', bookingsController.getAllBookings);
router.post('/bookshow', bookingsController.bookShow);

module.exports = router;

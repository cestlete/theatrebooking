const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.get('/booking/:id', bookingsController.getBookingDetails);
router.post('/bookshow', bookingsController.bookShow);

module.exports = router;

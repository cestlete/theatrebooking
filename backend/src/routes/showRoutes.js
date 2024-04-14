/**
 * Description:
 * This file defines the routes for handling show-related requests.
 * It creates an Express router, assigns routes for retrieving shows, genres, and dates,
 * and connects these routes to corresponding controller functions.
 * The router is then exported to be mounted in the main Express application.
 */

const express = require('express');
const router = express.Router();
const showsController = require('../controllers/showsController');

router.get('/shows', showsController.getShows);
router.get('/genres', showsController.fetchGenres);
router.get('/dates', showsController.fetchDates);

module.exports = router;

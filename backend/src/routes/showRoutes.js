const express = require('express');
const router = express.Router();
const showsController = require('../controllers/showsController');

router.get('/shows', showsController.getShows);
router.get('/genres', showsController.fetchGenres);
router.get('/dates', showsController.fetchDates);

module.exports = router;

/**
 * Description: Controller for show-related operations.
 */
const Show = require('../models/show');
const { getGenres, getDates } = require('../utils/db');

/**
 * Retrieves information about all shows.
 * Calculates the total remaining tickets for each show and adds a flag indicating availability.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with show details and availability information:
 *                     true for total remaining tickets > 0, false otherwise
 */
exports.getShows = async (req, res) => {
  try {
    const shows = await Show.find({}); // Retrieve all shows from the database
     // Calculate total remaining tickets for each show
    const showsWithSession = shows.map(show => {
      let totalRemain = 0;
      show.session.forEach(session => {
        session.ticketsAvailability.forEach(tickets => {
          totalRemain += tickets.remain;
        });
      });
      return {
        ...show._doc,
        hasAvailability: totalRemain > 0
         // set hasAvailability depending on remaining tickets
      };
    });
    res.json(showsWithSession); // 
  } catch (error) {
    console.error('Error fetching show information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Fetches all available genres for display in the filter dropdown.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with available genres
 */
exports.fetchGenres = async (req, res) => {
  try {
    const genres = await getGenres();
    res.json(genres);
  } catch (error) {
    console.error('Error in fetchGenres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Fetches all available dates for display in the filter dropdown.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with available dates
 */
exports.fetchDates = async (req, res) => {
  try {
    const dates = await getDates();
    res.json(dates);
  } catch (error) {
    console.error('Error in fetchDates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

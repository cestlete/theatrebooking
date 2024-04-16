/**
 * Description: Controller for show-related operations.
 */
const Show = require('../models/show');
const { getGenres, getDates } = require('../utils/db');

/**
 * @swagger
 * /api/shows:
 *   get:
 *     summary: Retrieve a list of shows
 *     description: Retrieve a list of all shows
 *     responses:
 *       200:
 *         description: A list of shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
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
    // Retrieve all shows from the database
    const shows = await Show.find({}); 
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
        // Set hasAvailability depending on remaining tickets
        hasAvailability: totalRemain > 0         
      };
    });
    res.json(showsWithSession); // 
  } catch (error) {
    console.error('Error fetching show information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Retrieve a list of genres
 *     description: Retrieve a list of all genres
 *     responses:
 *       200:
 *         description: A list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: Action
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
 * @swagger
 * /api/dates:
 *   get:
 *     summary: Retrieve a list of dates
 *     description: Retrieve a list of all dates
 *     responses:
 *       200:
 *         description: A list of dates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: 2024-04-15
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

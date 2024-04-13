const Show = require('../models/show');
const { getGenres, getDates } = require('../utils/db');

exports.getShows = async (req, res) => {
  try {
    const shows = await Show.find({});
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
      };
    });
    res.json(showsWithSession);
  } catch (error) {
    console.error('Error fetching show information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.fetchGenres = async (req, res) => {
  try {
    const genres = await getGenres();
    res.json(genres);
  } catch (error) {
    console.error('Error in fetchGenres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.fetchDates = async (req, res) => {
  try {
    const dates = await getDates();
    res.json(dates);
  } catch (error) {
    console.error('Error in fetchDates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

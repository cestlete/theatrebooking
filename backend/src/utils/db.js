/**
 * Description: 
 * MongoDB connection and data fetching functions.
 */

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URL;

// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Fetch genres from MongoDB
const getGenres = async () => {
  try {
    // Get distinct genres from the 'nowShowing' collection
    const genres = await mongoose.connection.db.collection('nowShowing').distinct('genre');
    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Fetch dates from MongoDB
const getDates = async () => {
  try {
    // Get distinct dates from the 'nowShowing' collection
    const dates = await mongoose.connection.db.collection('nowShowing').distinct(
      'session.date');
    return dates;
  } catch (error) {
    console.error('Error fetching dates:', error);
    throw error;
  }
};

// Export the functions
module.exports = { connectToDB, getGenres, getDates }; 

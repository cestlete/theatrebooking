const mongoose = require('mongoose');
const uri = 'mongodb+srv://cs615project:CShPO9Zy8Xrpwv29@cluster0.yhuwpgo.mongodb.net/cs615';

const connectToDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

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
module.exports = {connectToDB, getGenres}; 

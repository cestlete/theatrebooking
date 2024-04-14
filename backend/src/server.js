/**
 * Description: 
 * Loads environment variables using dotenv
*  Initializes the Express app
*  Sets up routes for managing shows and bookings
*  Enables CORS, parses JSON data
*  Connects to MongoDB, and starts the server on the specified port.
*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { connectToDB } = require('./utils/db');
connectToDB();

const app = express();

// enable CORS
app.use(cors());
// enable req.body JSON data
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.use('/api', showRoutes);
app.use('/api', bookingRoutes);

/**
 * Description: 
 * Loads environment variables using dotenv
*  Initializes the Express app
*  Sets up routes for managing shows and bookings
*  Enables CORS, parses JSON data
*  Connects to MongoDB, and starts the server on the specified port.
*/
// Load environment variables from a .env file
require('dotenv').config();
// Import libraries
const express = require('express'); // HTTP requests 
const cors = require('cors'); // Cross origin requests
// Import route handlers
const showRoutes = require('./routes/showRoutes'); // Shows
const bookingRoutes = require('./routes/bookingRoutes'); // Bookings
// Import utility to connect to database
const { connectToDB } = require('./utils/db');
connectToDB(); // Establish connection

const app = express();

// enable CORS middleware
app.use(cors());
// enable req.body JSON data
app.use(express.json());
// Use .env port default to 8000
const PORT = process.env.PORT || 8000;
// start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
// API routes
app.use('/api', showRoutes); // Mount showRoutes under '/api' path
app.use('/api', bookingRoutes); // Mount bookingRoutes under '/api' path

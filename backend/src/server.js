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
// - HTTP requests 
const express = require('express'); 
// - Cross origin requests
const cors = require('cors'); 

// Import Route Handlers:
// - Shows
const showRoutes = require('./routes/showRoutes');
// - Bookings
const bookingRoutes = require('./routes/bookingRoutes'); 

// Establish Database Connection:
const { connectToDB } = require('./utils/db');
connectToDB();

// Create Express Application Instance
const app = express();

// Enable CORS middleware
app.use(cors());
// Enable req.body JSON data
app.use(express.json());

// Use .env port default to 8000
const PORT = process.env.PORT || 8000;
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// API routes
// - Mount showRoutes under '/api' path
app.use('/api', showRoutes); 
// - Mount bookingRoutes under '/api' path
app.use('/api', bookingRoutes); 

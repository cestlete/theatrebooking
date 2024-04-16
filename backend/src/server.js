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
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json'); // Assuming you have swagger.json file in the swagger folder
const swaggerDefinition = require('./swagger/swaggerDefinition');
// Create Express Application Instance
const app = express();

// Enable CORS middleware
app.use(cors());
// Enable req.body JSON data
app.use(express.json());
// Enable Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { swaggerOptions: { ...swaggerDefinition } }));
// Use .env port default to 8000
const PORT = process.env.PORT || 8000;
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// default route
app.get('/', (req, res) => {
  res.send('Welcome to the SHow Booking API. For the list of available APIs, go to /api-docs');
});

// API routes
// - Mount showRoutes under '/api' path
app.use('/api', showRoutes);
// - Mount bookingRoutes under '/api' path
app.use('/api', bookingRoutes);

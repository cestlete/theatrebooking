require('dotenv').config();
// Import libraries
const express = require('express'); // HTTP requests 
const cors = require('cors'); // Cross origin requests
// Import route handlers
const showRoutes = require('./routes/showRoutes'); // Shows
const bookingRoutes = require('./routes/bookingRoutes'); // Bookings
// Import utility to connect to database
const { connectToDB } = require('./utils/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json'); // Assuming you have swagger.json file in the swagger folder
const swaggerDefinition = require('./swagger/swaggerDefinition');

connectToDB();

const app = express();

// Enable CORS
app.use(cors());
// Enable req.body JSON data
app.use(express.json());
// Enable Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { swaggerOptions: { ...swaggerDefinition } }));


const PORT = process.env.PORT || 8000;
// start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Define your API routes
app.use('/api', showRoutes);
app.use('/api', bookingRoutes);

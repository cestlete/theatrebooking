require('dotenv').config();
const express = require('express');
const cors = require('cors');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {swaggerOptions: {...swaggerDefinition} }));


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Define your API routes
app.use('/api', showRoutes);
app.use('/api', bookingRoutes);

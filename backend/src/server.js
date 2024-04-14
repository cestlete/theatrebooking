require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { connectToDB } = require('./utils/db');
connectToDB();

const app = express();

app.use(cors()); // enable CORS
app.use(express.json()); // enable req.body JSON data

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.use('/api', showRoutes);
app.use('/api', bookingRoutes);

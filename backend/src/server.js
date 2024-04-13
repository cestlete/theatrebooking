const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb+srv://cs615project:CShPO9Zy8Xrpwv29@cluster0.yhuwpgo.mongodb.net/cs615', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});

app.use('/api', showRoutes);
app.use('/api', bookingRoutes);

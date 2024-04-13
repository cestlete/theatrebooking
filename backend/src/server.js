// Import the express library
const express = require('express');
// Import the body-parser library, parese the request body
const bodyParser = require('body-parser');
// Import the functions from the db.js file
const { connectToDB, getGenres, getDates } = require('./db');
// Import the mongoose library
const mongoose = require('mongoose');
// Create an express application
const app = express();
// Parse JSON request body
app.use(bodyParser.json());
// Set the port number
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToDB();

// Define the schema for the show data
const ticketsAvailabilitySchema = new mongoose.Schema({
  price: Number,
  remain: Number
});

const sessionSchema = new mongoose.Schema({
  date: String,
  ticketsAvailability: [ticketsAvailabilitySchema]
});

const showSchema = new mongoose.Schema({
  showName: String,
  genre: [String],
  briefDescription: String,
  session: [sessionSchema]
});

// Define the schema for the booking information
const bookingInfoSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNumber: String,
  date: String,
  price: Number,
  showName: String,
  ticketsBooked: Number
});

// Create a model for the show data
const nowShowing = mongoose.model('NowShowing', showSchema, 'nowShowing');
// Create a model for the booking information
const bookingInfo = mongoose.model('BookingInfo', bookingInfoSchema, 'bookingInfo');

// Get all shows with hasAvailability field added (based on ticket availability)
app.get('/shows', async (req, res) => {
  try {
    // get all show data
    const shows = await nowShowing.find({}, { _id: 0 });

    // manipulate the show data to include availability information for each show
    const showsWithSession = shows.map(show => {
      // check if there are sessions available
      if (!show.session) {
        return show;
      }

      let totalRemain = 0;
      const session = show.session.map(session => {
        // check if there are tickets available
        if (!session.ticketsAvailability) {
          return session;
        }

        const ticketsAvailability = session.ticketsAvailability.map(ticketsAvailability => {
          // calculate the total number of tickets available
          totalRemain = Number(totalRemain) + Number(ticketsAvailability.remain)
        });

      });
      const hasAvailability = totalRemain > 0;

      // create a new field in the show object to indicate whether there are tickets available
      return {
        ...show._doc,
        hasAvailability
      };
    });

    //return the updated show data
    res.json(showsWithSession);
  } catch (error) {
    console.error('Error fetching show information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get genres for the dropdown
app.get('/genres', async (req, res) => {
  try {
    // Fetch genres data using the getGenres function
    const genres = await getGenres();

    // Send the genres data as a JSON response
    res.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get dates for the dropdown
app.get('/dates', async (req, res) => {
  try {
    // Fetch dates data using the getDates function
    const dates = await getDates();
    // console.log('dates:', dates);
    // let dateArray = [];

    // dates.forEach(function (item) {
    //     for (const key in item) {
    //         dateArray.push(key);
    //     }
    // }, function (err) {
    // });

    // const datesUniqueArray = dateArray.filter((item, index, arr) => arr.indexOf(item) === index);

    // Send the dates data as a JSON response
    res.json(dates);
  } catch (error) {
    console.error('Error fetching dates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get the details of a specific booking
app.get('/booking/:id', async (req, res) => {
  const bookingId = req.params.id;
  console.log('bookingId:', bookingId);
  try {
    const booking = await bookingInfo.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Check the remaining tickets for a specific show on a specific date and price
app.get('/availability', async (req, res) => {
  const { showId, date, price } = req.query;

  try {
    const show = await nowShowing.findById(showId);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

   // Find the session matching the provided date
    const session = show.session.find(s => s.date === date);
    if (!session) {
      return res.status(404).json({ error: 'Session not found for the provided date' });
    }
    
    // Find the ticket availability matching the provided price
    const ticketAvailability = session.ticketsAvailability.find(t => parseFloat(t.price) === parseFloat(price));
    if (!ticketAvailability) {
      return res.status(404).json({ error: 'Ticket availability not found for the provided price' });
    }
    
    // Return the remaining tickets
    res.json({ remain: ticketAvailability.remain });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update the remaining tickets for a specific show on a specific date and price
// If the remaining tickets are updated successfully, create a booking
app.post('/bookshow', async (req, res) => {
  const { showId, date, price, ticketsBooked, bookingDetails } = req.body;

  try {
    let remainUpdated = false;

    // Update remaining tickets
    const show = await nowShowing.findById(showId);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    show.session.forEach(session => {
      if (session.date === date) {
        session.ticketsAvailability.forEach(ticket => {
          if (ticket.price === parseFloat(price)) {
            if (ticket.remain - ticketsBooked >= 0) {
              ticket.remain -= ticketsBooked;
              remainUpdated = true;
            } else {
              return res.status(400).json({ error: 'Not enough tickets available' });
            }
          }
        });
      }
    });

    console.log('remainUpdated:', remainUpdated);
    if (remainUpdated) {
      // Save updated show data
      await show.save();

      // Save booking information
      const booking = await bookingInfo.create(bookingDetails);

      //const booking = await bookingInfo.create(req.body.bookingInfo);
      res.status(201).json({ message: 'Booking created successfully', booking });
    } else {
      res.status(400).json({ error: 'Failed to update remaining tickets' });
    }
  } catch (error) {
    console.error('Error making booking and updating remain:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

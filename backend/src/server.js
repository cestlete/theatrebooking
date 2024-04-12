const express = require('express');
// Import the body-parser library, parese the request body
const bodyParser = require('body-parser');
const { connectToDB, getGenres, getDates } = require('./db');

const mongoose = require('mongoose');

const app = express();
// Parse JSON request body
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;

connectToDB();


// schema for subdocument ticket
const ticketSchema = new mongoose.Schema({
  price: Number,
  remain: Number
});

// schema for show
const showSchema = new mongoose.Schema({
  showName: String,
  genre: [String],
  briefDescription: String,
  session: [{
    date: String,
    ticketsAvailability: [{
      price: String,
      remain: String
    }]
  }]
});


const bookingInfoSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNumber: String,
  date: String,
  price: Number,
  showName: String,
  ticketsBooked: Number
});

const nowShowing = mongoose.model('NowShowing', showSchema, 'nowShowing');
const bookingInfo = mongoose.model('BookingInfo', bookingInfoSchema, 'bookingInfo');


// app.get('/home', async (req, res) => {
//   try {
//     const shows = await nowShowing.find();
//     res.json(shows);
//   } catch (error) {
//     console.error('Error fetching shows:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/home', async (req, res) => {
  try {
    // get all show data
    const shows = await nowShowing.find();

    console.log('shows:', shows);


    // manipulate the show data to include availability information for each show
    const showsWithSession = shows.map(show => {
      // check if there are sessions available
      console.log('show.session:', show.session);
      if (!show.session) {
        return show;
      }

      let totalRemain = 0;
      const session = show.session.map(session => {
        // check if there are tickets available
        console.log('session.ticketsAvailability:', session.ticketsAvailability);
        if (!session.ticketsAvailability) {
          return session;
        }

        const ticketsAvailability = session.ticketsAvailability.map(ticketsAvailability => {
          console.log('ticketsAvailability.remain:', ticketsAvailability.remain);
          // calculate the total number of tickets available
          totalRemain = Number(totalRemain) + Number(ticketsAvailability.remain)
        });

      });

      console.log('totalRemain:', totalRemain);

      const hasAvailability = totalRemain > 0;

      // create a new field in the show object to indicate whether there are tickets available
      return {
        ...show,
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

// Create a booking
app.post('/makebooking', async (req, res) => {
  try {
    const booking = await bookingInfo.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get the details of a specific booking
app.get('/booking/:id', async (req, res) => {
  const bookingId = req.params.id;
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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

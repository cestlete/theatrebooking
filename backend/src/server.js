    const express = require('express');
    const {connectToDB, getGenres} = require('./db'); 
    const mongoose = require('mongoose');

    const app = express();
    const PORT = process.env.PORT || 8000;

    connectToDB();

    const nowShowing = mongoose.model('NowShowing', {} , 'nowShowing');

    app.get('/home', async (req, res) => {
        try {
            const shows = await nowShowing.find();
            res.json(shows);
        } catch (error) {
            console.error('Error fetching shows:', error);
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

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });





    






const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://dbUser:dbPassword@cluster0.khkmdj8.mongodb.net/recipefinder?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

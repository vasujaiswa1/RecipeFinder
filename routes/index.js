const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');

// MongoDB Schema
const searchSchema = new mongoose.Schema({
    ingredient: String,
    date: { type: Date, default: Date.now }
});
const Search = mongoose.model('Search', searchSchema);

// Home Route
router.get('/', (req, res) => {
    res.render('index');
});

// Handle Form Submission
router.post('/search', async (req, res) => {
    const ingredient = req.body.ingredient;

    // Save search to MongoDB
    const search = new Search({ ingredient: ingredient });
    await search.save();

    // Fetch data from MealDB API
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
        const response = await axios.get(apiUrl);
        const recipes = response.data.meals;
        res.render('results', { recipes: recipes });
    } catch (error) {
        console.error(error);
        res.send('An error occurred while fetching data.');
    }
});

module.exports = router;

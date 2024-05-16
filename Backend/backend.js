const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors= require('cors')

const app = express();
const PORT = 5000;
app.use(cors())

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/quotesDB');


// Define a schema for the quotes
const quoteSchema = new mongoose.Schema({
    author: String,
    quote: String
});

const Quote = mongoose.model('Quote', quoteSchema);

// Middleware
app.use(bodyParser.json());


// API endpoint to save a quote to the database
app.post('/api/quotes', async (req, res) => {
    try {
        const { author, quote } = req.body;
        console.log(req.body)
        const newQuote = new Quote({ author, quote });
        await newQuote.save();
        res.status(201).json({ message: 'Quote saved successfully' });
    } catch (error) {
        console.error('Error saving quote:', error);
        res.status(500).json({ error: 'An error occurred while saving the quote' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

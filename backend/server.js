
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const logger = require('./middlewares/logger');
const ShortUrl = require('./models/ShortUrl');

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('DB Error:', err));

// Routes
app.use('/shorturls', require('./routes/shorturls'));

// Redirect
app.get('/:shortcode', async (req, res) => {
    try {
        const shortUrl = await ShortUrl.findOne({ shortcode: req.params.shortcode });
        if (!shortUrl) return res.status(404).json({ error: 'Shortcode not found' });

        if (shortUrl.expiresAt < new Date()) {
            return res.status(410).json({ error: 'Link has expired' });
        }

        shortUrl.clicks.push({
            referrer: req.get('Referer') || 'Direct',
            location: 'Unknown'
        });
        await shortUrl.save();

        return res.redirect(shortUrl.originalUrl);
    } catch (err) {
        console.error('Error in redirection:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});

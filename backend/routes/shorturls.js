
const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/ShortUrl');
const shortid = require('shortid');

router.post('/', async (req, res) => {
    try {
        const { url, validity, shortcode } = req.body;

        if (!url || !/^https?:\/\//i.test(url)) {
            return res.status(400).json({ error: 'Invalid or missing URL' });
        }

        const validFor = validity && Number.isInteger(validity) ? validity : 30;
        const expiresAt = new Date(Date.now() + validFor * 60000);

        let finalCode = shortcode;
        if (finalCode) {
            const exists = await ShortUrl.findOne({ shortcode: finalCode });
            if (exists) return res.status(400).json({ error: 'Custom shortcode already exists' });
        } else {
            do {
                finalCode = shortid.generate();
            } while (await ShortUrl.findOne({ shortcode: finalCode }));
        }

        const newShortUrl = await ShortUrl.create({
            originalUrl: url,
            shortcode: finalCode,
            expiresAt
        });

        return res.status(201).json({
            shortLink: `http://localhost:5000/${newShortUrl.shortcode}`,
            expiry: newShortUrl.expiresAt.toISOString()
        });

    } catch (err) {
        console.error('Error creating short URL:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:shortcode', async (req, res) => {
    try {
        const shortUrl = await ShortUrl.findOne({ shortcode: req.params.shortcode });
        if (!shortUrl) return res.status(404).json({ error: 'Shortcode not found' });

        return res.json({
            originalUrl: shortUrl.originalUrl,
            createdAt: shortUrl.createdAt,
            expiresAt: shortUrl.expiresAt,
            totalClicks: shortUrl.clicks.length,
            clicks: shortUrl.clicks
        });

    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/', async (req, res) => {
    try {
        const { league, sport, status } = req.query;
        const filter = {};
        
        if (league && league !== 'all') filter.league = league;
        if (sport) filter.sport = sport;
        if (status && status !== 'all') filter.status = status;

        const games = await Game.find(filter).sort({ startTime: 1 }).limit(50);
        res.json({ success: true, games });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get games' });
    }
});

router.get('/live', async (req, res) => {
    try {
        const games = await Game.find({ status: 'live' });
        res.json({ success: true, games });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get live games' });
    }
});

module.exports = router;
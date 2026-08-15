const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    league: {
        type: String,
        required: true,
        index: true
    },
    sport: {
        type: String,
        enum: ['football', 'basketball', 'tennis', 'virtual', 'casino'],
        default: 'football'
    },
    homeTeam: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ['upcoming', 'live', 'finished', 'cancelled'],
        default: 'upcoming',
        index: true
    },
    odds: {
        home: { type: Number, default: 1.00 },
        draw: { type: Number, default: 1.00 },
        away: { type: Number, default: 1.00 }
    },
    markets: [{
        name: String,
        options: [{
            name: String,
            odds: Number
        }]
    }],
    score: {
        home: { type: Number, default: 0 },
        away: { type: Number, default: 0 }
    },
    statistics: {
        possession: { home: Number, away: Number },
        shots: { home: Number, away: Number },
        corners: { home: Number, away: Number }
    },
    isLive: {
        type: Boolean,
        default: false
    },
    liveMinute: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes for faster queries
gameSchema.index({ sport: 1, status: 1, startTime: 1 });
gameSchema.index({ league: 1, status: 1 });

module.exports = mongoose.model('Game', gameSchema);
const mongoose = require('mongoose');

const jackpotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['progressive', 'fixed', 'mystery'],
        default: 'progressive'
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    startingAmount: {
        type: Number,
        default: 100000
    },
    minContribution: {
        type: Number,
        default: 10
    },
    totalWinners: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'drawing'],
        default: 'active'
    },
    drawDate: Date,
    lastDrawDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Jackpot', jackpotSchema);
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'bet', 'winning', 'refund', 'bonus'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ['telebirr', 'cbe_birr', 'bank_transfer', 'internal', 'system'],
        default: 'telebirr'
    },
    reference: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending',
        index: true
    },
    balanceAfter: Number,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date
}, {
    timestamps: true
});

// Generate unique reference
transactionSchema.pre('save', function(next) {
    if (!this.reference) {
        const prefix = this.type === 'deposit' ? 'DEP' : 
                      this.type === 'withdrawal' ? 'WDR' : 
                      this.type === 'bet' ? 'BET' : 'TXN';
        this.reference = `${prefix}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    }
    next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
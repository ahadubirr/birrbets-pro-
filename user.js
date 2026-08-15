const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    bonusBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    totalDeposited: {
        type: Number,
        default: 0
    },
    totalWithdrawn: {
        type: Number,
        default: 0
    },
    totalWinnings: {
        type: Number,
        default: 0
    },
    totalBets: {
        type: Number,
        default: 0
    },
    referralCode: {
        type: String,
        unique: true,
        default: () => crypto.randomBytes(4).toString('hex').toUpperCase()
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'agent', 'admin', 'super_admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'banned'],
        default: 'active'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for total balance
userSchema.virtual('totalBalance').get(function() {
    return this.balance + this.bonusBalance;
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    score: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    highScore: { type: Number, default: 0 },
    pastScores: [scoreSchema],
});

module.exports = mongoose.model('User', userSchema);

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/auth', async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });

        user.pastScores = user.pastScores
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

            return res.status(200).json({ message: 'Login successful', user });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            user = new User({
                username,
                password: hashedPassword,
            });

            await user.save();
            return res.status(201).json({ message: 'User registered successfully', user });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Error during authentication' });
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ highScore: -1 }).limit(10);
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching leaderboard' });
    }
});



router.put('/user/:username', async (req, res) => {
    try {
        const { newScore } = req.body;

        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (newScore > user.highScore) user.highScore = newScore;

        user.pastScores.push({ score: newScore });

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user data' });
    }
});

module.exports = router;

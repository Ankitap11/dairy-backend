const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');

// Add Farmer
router.post('/add', async (req, res) => {
    try {
        const farmer = new Farmer(req.body);
        await farmer.save();
        res.send("Farmer Added");
    } catch (err) {
        res.send(err);
    }
});

// Get Farmers
router.get('/', async (req, res) => {
    const farmers = await Farmer.find();
    res.json(farmers);
});

module.exports = router;
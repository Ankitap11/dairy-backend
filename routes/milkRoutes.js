const express = require('express');
const router = express.Router();
const MilkEntry = require('../models/MilkEntry');

// Add Milk Entry
router.post('/add', async (req, res) => {
    try {
        const { farmerId, quantity, fat, date } = req.body;

        const rate = 10;
        const amount = quantity * fat * rate;

        const milk = new MilkEntry({
            farmerId,
            quantity,
            fat,
            date,
            amount
        });

        await milk.save();

        res.send("Milk Entry Added with Amount: " + amount);
    } catch (err) {
        res.send(err);
    }
});

// Get Milk Entries
router.get('/', async (req, res) => {
    const data = await MilkEntry.find();
    res.json(data);
});

module.exports = router;
// Get Total Earnings of Farmer
router.get('/total/:farmerId', async (req, res) => {
    const farmerId = req.params.farmerId;

    const data = await MilkEntry.find({ farmerId });

    let total = 0;

    data.forEach(item => {
        total += item.amount;
    });

    res.json({
        farmerId,
        totalEarning: total
    });
});

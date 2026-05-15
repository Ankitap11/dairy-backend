const mongoose = require('mongoose');

const MilkEntrySchema = new mongoose.Schema({
    farmerId: String,
    quantity: Number,
    fat: Number,
    date: String,
    amount: Number
});

module.exports = mongoose.model('MilkEntry', MilkEntrySchema);
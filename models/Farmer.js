const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    name: String,
    phone: String
});

module.exports = mongoose.model('Farmer', FarmerSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  stockId: String,
  history: [{
    date: Date,
    price: Number,
  }],
});

module.exports = mongoose.model('stockHistory', stockSchema);

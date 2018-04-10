const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  stockId: String,
  history: [{
    date: '',
    price: Number,
  }],
});

module.exports = mongoose.model('stockHistory', stockSchema);

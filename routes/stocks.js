const express = require('express');
const router = express.Router();
const Stock = require('../models/stocks');

// PUT stock history into database
router.put('/add', function(req, res, next) {
  let stockSymbol = req.body.stockSymbol;

  // create the api call to Alpha Advantage
  let apiAddress = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' +
    stockSymbol +
    '&apikey=' +
    pocess.env.ALPHA_ADVANTAGE_API_KEY;

  fetch(apiAddress)
    .then((resp) => resp.json())
    .then((stockHistory) => {
      // simply log the response to console
      console.log(stockHistory);
      res.sendStatus(200);
    });
});

module.exports = router;

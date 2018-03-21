const express = require('express');
const router = express.Router();
const Stock = require('../models/stocks');
const fetch = require('node-fetch');
const library = require('../library');

// PUT stock history into database
router.put('/addStock', function(req, res, next) {
  let stockSymbol = req.body.stockSymbol;

  // create the api call to Alpha Advantage
  let apiAddress = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' +
    stockSymbol +
    '&apikey=' +
    process.env.ALPHA_ADVANTAGE_API_KEY;

  fetch(apiAddress)
    .then(library.handleFetchErrors)
    .then((resp) => resp.json())
    .then((stockHistory) => {
      // catch the invalid stock symbols
      if (stockHistory['Error Message']) {
        console.log('Invalid Stock Symbol');
        res.json({'Error': 'Invalid stock symbol!'});
      } else {
        // simply log the response to console
        console.log('Stock history received!');
        console.log(stockHistory);
        res.sendStatus(200);
      }
    })
    .catch((error) => {
      console.log('Error calling Alpha Advantage: ' + error);
      res.sendStatus(401);
    });
});

module.exports = router;

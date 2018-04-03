const express = require('express');
const router = express.Router();
const Stock = require('../models/stocks');
const fetch = require('node-fetch');
const library = require('../library');
const entries = require('object.entries');

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
        console.log(stockHistory['Meta Data']);
        if (!addStock(stockHistory)) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      }
    })
    .catch((error) => {
      console.log('Error calling Alpha Advantage: ' + error);
      res.sendStatus(401);
    });
});

function addStock(stockHistory) {
  console.log(stockHistory['Meta Data']['2. Symbol']);
  Stock.findOne({stockId: stockHistory['Meta Data']['2. Symbol']},
    (err, stock) => {
    if (stock) {
      // if stock is already in database
      console.log('Stock is already in database!');
    } else {
      // if entires is not defined in object, pollyfill with shim
      if (!Object.entries) {
        entries.shim();
      }

      // iterate over object and put history into an array
      let datesAndPrices = Object
        .entries(stockHistory['Time Series (Daily)'])
        .map(([key, value]) => {
        return {
          date: key,
          price: value['4. close'],
        };
      });

      // add stock history to database
      let newStockHistory = new Stock({
        stockId: stockHistory['Meta Data']['2. Symbol'],
        history: datesAndPrices,
      });
      newStockHistory.save((err) => {
        if (err) {
          console.log('Saving new history failed: ' + err);
          return false;
        } else {
          return true;
        }
      });
    }
  });
}

module.exports = router;

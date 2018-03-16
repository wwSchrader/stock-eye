const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/message', function(req, res, next) {
  res.json({title: 'Express is working!'});
});

router.use('/stocks', require('./stocks.js'));

router.get('/addStock', function(req, res, next) {
  console.log(req.query.symbol);
  let io = req.app.get('socketio');
  io.emit('stockMessage', req.query.symbol);

  res.sendStatus(200);
});

module.exports = router;

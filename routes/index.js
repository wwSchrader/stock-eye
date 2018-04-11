const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/message', function(req, res, next) {
  res.json({title: 'Express is working!'});
});

router.use('/stocks', require('./stocks.js'));

module.exports = router;

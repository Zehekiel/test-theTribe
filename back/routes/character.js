const express = require('express');
const router = express.Router();

/* GET character. */
router.get('/', function(req, res, next) {
  res.send('character');
});

module.exports = router;

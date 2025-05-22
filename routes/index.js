var express = require('express');
var router = express.Router();

/* GET Health check. */
router.get('/', function(req, res, next) {
  console.log(req.requestTime);
  res.send ('OK');
});

module.exports = router;

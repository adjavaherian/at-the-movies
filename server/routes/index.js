// server/routes/index.js
// this is your main space for including routes
var express = require('express');
var router = express.Router();

// use these routes
router.use(require('./base'));

module.exports = router;

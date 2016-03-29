//base.js
//serve middleware for this 'base' route

var express = require('express');
var router = express.Router();
var flux = require('../middleware/flux');
var reactMiddleware = require('../middleware/react');
//var errorHandler = require('../middleware/error-handler');

router.route('/*')
    .get(
    flux, //add flux to res.locals
    reactMiddleware //finally run react-router from webpacked middleware
    //errorHandler
);

module.exports = router;

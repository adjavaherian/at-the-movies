//base.js
//serve middleware for this 'base' route

var express = require('express');
var router = express.Router();
//var trace = require('../middleware/trace');
//var redirection = require('../middleware/redirection');
//var flux = require('../middleware/flux');
//var refTrack = require('../middleware/ref-track');
//var head = require('../middleware/head');
//var checkRedirect = require('../middleware/check-redirect');
//var checkAuth = require('../middleware/check-auth');
var reactMiddleware = require('../middleware/react');
//var errorHandler = require('../middleware/error-handler');

router.route('/*')
    .get(
    //trace, //add trace to res.locals
    //redirection, //quick re-direct if needed
    //flux, //add flux to res.locals
    //refTrack, //add reference tracking
    //head, //build html head and add to res.locals
    //checkRedirect, //check redirect api
    //checkAuth, //check for authentication
    reactMiddleware //finally run react-router from webpacked middleware
    //errorHandler
);

module.exports = router;

var url = require('url');
var config = require('config');
var FluxConstructor = require('app/flux');

module.exports = function(req, res, next) {
    var flux = FluxConstructor();
    var path = url.parse(req.url).pathname;

    res.locals.flux = flux;

    next();
};

//config/config.winston.js
//server side only
var winston = require('winston');
var deepMerge = require('deep-merge');
var isIntProd = (process.env.NODE_ENV  === 'production' || process.env.NODE_ENV  === 'integration');
var logLevel = require('./config').server.logging.logLevel;

//setup a time stamp for the logger
var timeStamp = function timeStamp() {
    return new Date().toLocaleString();
};

//setup a deep merge extension of two configs
var deepMergeExtended = deepMerge(function(target, source) {
    if (target instanceof Array) {
        return [].concat(target, source);
    }
    return source;
});

function config(overrides) {
    return deepMergeExtended(defaults, overrides || {});
}

var customLevels = {
    levels: {
        react: 0,
        stores: 1,
        actions: 2,
        flux: 3
    },
    colors: {
        react: 'cyan',
        stores: 'magenta',
        actions: 'blue',
        flux: 'green'
    }
};

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            json: isIntProd,
            colorize: !isIntProd,
            level: 'debug',
            prettyPrint: !isIntProd,
            timestamp: isIntProd ? timeStamp : false
        })
    ]
});

var defaults = {
    winstonInstance: logger,
    meta: isIntProd, // optional: control whether you want to log the meta data about the request (default to true)
    expressFormat: !isIntProd, // Use the default Express/morgan request formatting, with the same colors.
    exitOnError: false,
    levels: customLevels.levels,
    colors: customLevels.colors
};

var winstonErrorConfig = {
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    expressFormat: false, // Use the default Express/morgan request formatting, with the same colors.
    exitOnError: false
};

var winstonDevConfig = {
    level: 'debug'
};

var winstonCustomConfig = {
    level: 'react'
};

var winstonProductionConfig = {
    level: 'info'
};

//define custom levels here:
var levels = ['silly', 'debug', 'verbose', 'info', 'warn', 'error'];

//lo-jack the console
console.log = function() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length > 1 && levels.indexOf(args[0]) > -1) {
        logger.log(args[0], args.slice(1).join(' '));
    } else if (args.length > 1 && levels.indexOf(args[0]) === -1) {
        logger.log('info', args.join(' '));
    } else {
        logger.log('info', args[0]);
    }
};

console.info = function(){
    logger.info(Array.prototype.slice.call(arguments));
};

console.warn = function(){
    logger.warn(Array.prototype.slice.call(arguments));
};

console.error = function(){
    logger.error(Array.prototype.slice.call(arguments));
};

console.debug = console.react = console.stores = function() {
    logger.debug(Array.prototype.slice.call(arguments));
};

module.exports = logger;
module.exports.defaultConfig =  isIntProd ? config(winstonProductionConfig) : config(winstonDevConfig);
module.exports.devConfig = config(winstonDevConfig);
module.exports.prodConfig = config(winstonProductionConfig);
module.exports.customConfig = config(winstonCustomConfig);
module.exports.errorConfig = config(winstonErrorConfig);


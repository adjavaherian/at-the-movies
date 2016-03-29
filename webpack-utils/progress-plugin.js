//progress-plugin.js
//module build progress

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');

function ProgressPlugin(opts) {

    return new webpack.ProgressPlugin(function(progress, message) {
        if (opts.console) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write('Webpack progress ' + Math.floor(progress * 100) + '% ' + message + '\r');
        }
    });

};

module.exports = ProgressPlugin;
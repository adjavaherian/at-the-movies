//index.js the server

var config = require('../config');
var express = require('express');
var routes = require('./routes');
var expressWinston = require('express-winston');
var logger = require('./logger');
var views = '.views';
var server = express();
var port = config.server.port || 3000;

server.set('env', config.server.env);
server.set('view engine', 'jade');
server.set('views', views);

console.log(process.cwd() + '/server/public');
server.use(express.static(process.cwd() + '/public', {
    dotfiles: 'ignore',
    etag: true,
    extensions: false,
    index: false,
    lastModified: true,
    maxAge: 31557600000,
    redirect: false
}));
server.use(expressWinston.logger(logger.defaultConfig));
server.use(routes);
server.use(expressWinston.errorLogger(logger.errorConfig));

server.listen(port, function() {
    console.info('Express server listening on port ' + port);
});

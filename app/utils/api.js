var requester = require('./requester');
var _ = require('lodash');
var auth = require('../../config').auth;

var api = {
    getMovies: function (flux) {
        var endpoint = 'https://interview.zocdoc.com/api/1/FEE/AllMovies' + auth;

        return requester('GET', endpoint, flux, null, null, null, {
            contentType: 'text/json',
            accept: 'text/json'
        });
    },
    getMoviesByRank: function(){
        //
    },
    getMovieDetails: function(){
        //
    }
};


module.exports = api;

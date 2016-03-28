var requester = require('./requester');
var _ = require('lodash');
var auth = require('../../config').auth;

var api = {
    getMovies: function () {
        var endpoint = 'https://interview.zocdoc.com/api/1/FEE/AllMovies';
        return requester('GET', endpoint, {authToken: auth});
    },
    getMoviesByRank: function(startRank, numMovies){
        var endpoint = 'https://interview.zocdoc.com/api/1/FEE/MoviesByRank';
        return requester('GET', endpoint, {authToken: auth, startRank: startRank, numMovies: numMovies});
    },
    getMovieDetails: function(){
        //
    }
};


module.exports = api;

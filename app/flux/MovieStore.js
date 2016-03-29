var Fluxxor = require('fluxxor');
var constants = require('./constants');

var MovieStore = Fluxxor.createStore({

    initialize: function() {

        this.state = {
            movies: [],
            topTen: []
        };

        this.bindActions(
            constants.ADD_MOVIES, this.onAddMovies
        );
    },

    onAddMovies: function(payload) {
        console.debug('onaddmovies=======================================');
        this.state.movies = [].concat(this.state.movies, payload);
        this.emit("change");
    },

    serialize: function() {
        return this.state;
    },
    hydrate: function(data) {
        this.state = data;
    }

});

module.exports = MovieStore;

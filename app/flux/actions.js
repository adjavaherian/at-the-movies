var constants = require('./constants');

var actions = {
    addMovies: function(movies) {
        console.debug('add movies');
        this.dispatch(constants.ADD_MOVIES, movies);
    }
};

module.exports = actions;
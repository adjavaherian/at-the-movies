var constants = require('./constants');

var actions = {
    addMovies: function(movies) {
        console.debug('add movies');
        this.dispatch(constants.ADD_MOVIES, movies);
    },

    toggleTodo: function(id) {
        this.dispatch(constants.TOGGLE_TODO, {id: id});
    },

    clearTodos: function() {
        this.dispatch(constants.CLEAR_TODOS);
    }
};

module.exports = actions;
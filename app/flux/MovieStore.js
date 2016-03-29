var Fluxxor = require('fluxxor');
var constants = require('./constants');

var MovieStore = Fluxxor.createStore({

    initialize: function() {
        this.todoId = 0;
        this.todos = {};
        this.state = {
            movies: [],
            topTen: []
        };

        this.bindActions(
            constants.ADD_MOVIES, this.onAddMovies,
            constants.TOGGLE_TODO, this.onToggleTodo,
            constants.CLEAR_TODOS, this.onClearTodos
        );
    },

    onAddMovies: function(payload) {
        console.debug('onaddmovies=======================================');
        this.state.movies = [].concat(this.state.movies, payload);
        this.emit("change");
    },

    onToggleTodo: function(payload) {
        var id = payload.id;
        this.todos[id].complete = !this.todos[id].complete;
        this.emit("change");
    },

    onClearTodos: function() {
        var todos = this.todos;

        Object.keys(todos).forEach(function(key) {
            if(todos[key].complete) {
                delete todos[key];
            }
        });

        this.emit("change");
    },

    getState: function() {
        return {
            todos: this.todos
        };
    },

    _nextTodoId: function() {
        return ++this.todoId;
    },

    serialize: function() {
        return this.state;
    },
    hydrate: function(data) {
        this.state = data;
    }

});

module.exports = MovieStore;

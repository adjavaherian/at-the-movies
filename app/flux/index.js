var Fluxxor = require('fluxxor');
var MovieStore = require('./MovieStore');
var actions = require('./actions');

module.exports = function(){

    var stores = {
        MovieStore: new MovieStore()
    };

    var flux = new Fluxxor.Flux(stores, actions);

    flux.on("dispatch", function(type, payload) {
        if (console && console.log) {
            console.log("[Dispatch]", type);
        }
    });

    flux.serialize = function() {
        var data = {};
        var key;

        for (key in stores) {
            if (stores.hasOwnProperty(key)) {
                data[key] = stores[key].serialize();
            }
        }
        return JSON.stringify(data);
    };

    flux.hydrate = function(json) {
        var data = JSON.parse(json);
        var key;

        for (key in data) {
            if (data.hasOwnProperty(key) && stores.hasOwnProperty(key)) {
                stores[key].hydrate(data[key]);
            }
        }
        return data;
    };

    return flux;
};
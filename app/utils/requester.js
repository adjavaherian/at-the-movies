var axios = require('axios');
var Promise = require('promise');
var config = require('config');


var requester = function(method, url, queryParams, body) {

    queryParams = queryParams || {};
    body = body || {};

    var options = {
        method: method,
        url: url,
        params: queryParams,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json,text/html'
        },
        data: body
    };

    return axios(options)
        .catch(function(response) {
            if (response instanceof Error) {
                // Something happened in setting up the request that triggered an Error
                console.debug('requester - Error', response);
                return Promise.reject(new Error(response));
            } else {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                console.debug('requester - other error', response);
                return Promise.reject(new Error(response));
            }
        })
        .then(function(response) {
            return response.data;
        });
};


module.exports = requester;

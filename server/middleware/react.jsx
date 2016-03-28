//server/middleware/react.js
//main react router middleware
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext} from 'react-router';
import AppRoutes from 'app/routes';

var url = require('url');
var Promise = require('promise');
var _ = require('lodash');


var reactMiddleWare = function(req, res, next) {

    res.end(200, 'React Middleware');

    //match({ routes: AppRoutes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    //    if (error) {
    //    res.status(500).send(error.message);
    //} else if (redirectLocation) {
    //    res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    //} else if (renderProps) {
    //    let abort = false;
    //    let userAuthRequired = false;
    //    let authPromise;
    //    let stateStub = _.extend({
    //        params: renderProps.params,
    //        path: renderProps.location.pathname,
    //        pathname: renderProps.location.pathname
    //    }, renderProps.location);
    //
    //    // quick return 404, check if user auth is required
    //    renderProps.components.forEach(function(route) {
    //        if (route && route.displayName === 'NotFoundPage') {
    //            res.status(404);
    //            abort = true;
    //        }
    //        if (route.userRequiredBeforeMount && route.userRequiredBeforeMount(stateStub)) {
    //            userAuthRequired = true;
    //        }
    //    });
    //
    //
    //} else {
    //    res.status(404).send('404 Not found');
    //}
    //});
};

module.exports = reactMiddleWare;

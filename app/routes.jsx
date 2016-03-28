//AppRoutes.jsx
//The single route configuration for react-router > 1.x

import React from 'react';
import { Route, IndexRoute } from 'react-router';

//templates
var AppTemplate = require('./template');

//pages
var FrontPage = require('app/pages/front-page');
var Research = require('app/pages/research');
var Booking = require('app/pages/booking');

//// transitions are now dealt with on the router configuration
//var regwallTransition = function(location, replaceWith) {
//    var loggedIn;
//
//    if (typeof window !== 'undefined' && typeof window.router !== 'undefined') {
//        loggedIn = window.flux.stores.UserStore.state.loggedIn || false;
//        if (!loggedIn) {
//            // Need to pass in pathname from location object to the replaceWith function.
//            // replaceWith will handle the transition.
//            replaceWith({
//                pathname: paths.LoginPage,
//                query: { 'redirect': location.location.pathname, 'changeHttpStatus': 302 }
//            });
//        }
//    }
//};

module.exports = (
    <Route component={AppTemplate} path="/">
        <IndexRoute component={FrontPage} />
        <Route component={Research} path="/research" />
        <Route component={Booking} path="/booking" />
    </Route>
);

// app.jsx
// This is the entry point to webpack bundling as well as the app router

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import AppRoutes from 'app/routes';
import 'app/utils/assign';


function createFluxComponent(Component, props) {
    props = Object.assign(props, {
        path: window.location.pathname
    });

    return <Component {...props} />;
}

browserHistory.listen(function(location) {
    console.log('Transition to', location.pathname);
});


// add window.router polyfill for transitionTo
window.router = {
    transitionTo: function(t) {
        return browserHistory.push(t);
    }
};

// render your routing configuration, history and flux as  props
ReactDOM.render(
    <Router createElement={createFluxComponent} history={browserHistory} routes={AppRoutes}/>,
    document.getElementById('app')
);

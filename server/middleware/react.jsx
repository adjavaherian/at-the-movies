//server/middleware/react.js
//main react router middleware
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext} from 'react-router';
import AppRoutes from 'app/routes';

var url = require('url');
var _ = require('lodash');
var Promise = require('promise');
function header(){
    return `
        <!doctype html>
        <html>
            <head lang="en">
            <meta
            content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimal-ui"
            name="viewport"
            />
            <meta charSet="UTF-8" />
            <meta content="IE=Edge" httpEquiv="X-UA-Compatible"/>
            <meta content="yes" name="apple-mobile-web-app-capable"/>
            <meta content="yes" name="mobile-web-app-capable"/>
            <script src="/commons.bundle.js"></script>
            <style></style>
            </head>
  `;

}

var reactMiddleWare = function(req, res, next) {

    //res.end('React Middlewarez ');

    match({ routes: AppRoutes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
        if (error) {
        res.status(500).send(error.message);
    } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {

        let stateStub = _.extend({
            params: renderProps.params,
            path: renderProps.location.pathname,
            pathname: renderProps.location.pathname
        }, renderProps.location);


        // collect promises
        var promises = [];

        renderProps.components.forEach(function(route) {
            console.log('route serverMount', typeof route.serverMount);
            if (route.serverMount) {
                promises.push(route.serverMount());
            }
        });


        Promise.all(promises)
            .catch(function(err) {
                console.warn('Error from SSR promise', err);
                if (res.headersSent) {
                    return true;
                }

                res.end(500);
            })
            .done(function onFulfilled(result) {

                console.debug('got result', typeof result);

                function createFluxComponent(Component, props) {
                    props = _.extend(props, stateStub, {result: result});
                    return <Component {...props} />;
                }

                if (res.headersSent) {
                    return true;
                }

                var markup = renderToString(
                    <RouterContext {...renderProps} createElement={createFluxComponent} />
                );

                res.write(header() + '<body><div id="app"><div>' + markup + '</div></div><script src="/app.bundle.js"></script></body></html>');
                res.end();

            });



    } else {
        res.status(404).send('404 Not found');
    }
    });
};

module.exports = reactMiddleWare;

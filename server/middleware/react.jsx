//server/middleware/react.js
//main react router middleware
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext} from 'react-router';
import AppRoutes from 'app/routes';

var url = require('url');
var _ = require('lodash');

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
            <meta content="E65CEFDE3236BB9C2E2D2BD27D4809BF" name="msvalidate.01"/>
            <link href="https://plus.google.com/u/1/b/111034699960542004994" rel="publisher"/>
            <script src='https://use.typekit.net/uox3mzi.js'></script>
            <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
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
        let abort = false;
        let stateStub = _.extend({
            params: renderProps.params,
            path: renderProps.location.pathname,
            pathname: renderProps.location.pathname
        }, renderProps.location);

        function createFluxComponent(Component, props) {
            props = _.extend(props, stateStub);
            return <Component {...props} />;
        }

        var markup = renderToString(
            <RouterContext {...renderProps} createElement={createFluxComponent} />
        );

        res.write(header() + '<body>' + markup + '</body></html>');
        res.end();


    } else {
        res.status(404).send('404 Not found');
    }
    });
};

module.exports = reactMiddleWare;

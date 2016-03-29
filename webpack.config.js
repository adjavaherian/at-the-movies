//webpack.config.js
//main webpack config
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DeepMerge = require('deep-merge');
var consoleAvailable = (process.argv.indexOf('--profile') === -1 &&
process.argv.indexOf('--json') === -1 &&
process.env.NODE_ENV !== 'production' &&
process.env.NODE_ENV !== 'integration');
var node_modules_dir = path.join(__dirname, 'node_modules');
var productionPlugins = [
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        }
    })
];

var deepmerge = DeepMerge(function(target, source, key) {
    if (target instanceof Array) {
        return [].concat(target, source);
    }
    return source;
});

function config(overrides) {
    return deepmerge(defaults, overrides || {});
}

//require common.js for node_modules (better for server)
var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });
function node_externals(context, request, cb) {
    if (node_modules.indexOf(request) !== -1) {
        cb(null, 'commonjs ' + request);
        return;
    }
    cb();
}


var client = {
    name: 'client side webpack',
    target: 'web',
    entry: {
        app: path.join(__dirname, 'app/app.jsx')
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: 'public/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass')
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.bundle.js',
            //minChunks: 2,
            chunks: ['rehydrate', 'app']
        }),
        new ExtractTextPlugin('style.[name].css', {
            disable: false,
            allChunks: true // extract all css from async chunks as well
        }),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __PRODUCTION__: JSON.stringify(process.env.NODE_ENV) === 'production',
            __DEV__: JSON.stringify(process.env.NODE_ENV) !== 'production'
        }),
        new webpack.ProvidePlugin({
            'Promise': 'native-promise-only'
        })
    ]

};

var server = {
    name: 'server side webpack',
    target: 'node',
    devtool: 'source-map',
    entry: {
        index: path.join(__dirname, 'server', 'index.js')
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, 'server', 'dist'),
        publicPath: '',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'noop-loader'
            }
        ]
    },
    resolveLoader: {
        root: __dirname,
        fallback: __dirname + '/node_modules',
        alias: {
            'noop-loader': path.join(__dirname,  'webpack-utils', 'noop-loader'),
            'passthru-loader': path.join(__dirname, 'webpack-utils', 'passthru-loader')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
            __PRODUCTION__: JSON.stringify(process.env.NODE_ENV) === 'production',
            __DEV__: JSON.stringify(process.env.NODE_ENV) !== 'production'
        }),
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        })
    ],
    externals: [{ 'react': true }, node_externals]
};

var defaults = {
    context: __dirname,
    node: {
        __dirname: true,
        __filename: true,
        fs: 'empty',
        tls: 'empty',
        net: 'empty',
        console: true
    },
    devtool: '#eval-source-map',
    externals: [/^config[a-z\-0-9]+$/],
    resolve: {
        root: path.join(__dirname),
        fallback: path.join(__dirname, 'node_modules'),
        modulesDirectories: ['app', 'images', 'node_modules'],
        extensions: ['', '.json', '.js', '.jsx', '.scss', '.png', '.jpg', '.jpeg', '.gif'],
        alias: {
            'hotpads-web' : __dirname,
            images: 'images',
            app: 'app',
            scss: 'scss',
            test: 'test',
            server: 'server',
            config: 'config'
        }
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || '"development"',
            'process.env.BUILD_NUMBER': JSON.stringify(process.env.BUILD_NUMBER) || '"42"',
            __KARMA__: false
        })
    ],

    module: {
        // Disable handling of unknown requires and requires with a single expression
        unknownContextRegExp: /$^/,
        exprContextRegExp: /$^/,
        unknownContextCritical: false,
        exprContextCritical: false,
        loaders: [
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
            , {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ],
        noParse: []
    },
    bail: false,
    cache: true,
    debug: true
};


module.exports = (process.argv.indexOf('--json') >= 0 || process.argv.indexOf('--profile') >= 0) ?
    config(client) : [config(client), config(server)];

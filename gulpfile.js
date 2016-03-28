//default.js
//the main dev task
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var config  = require('./config');
var gutil = require('gulp-util');
var devConfig = require('./webpack.config.js');
var webpack = require('webpack');
var nodemon = require('gulp-nodemon');
var path = require('path');

gulp.task('default', function(callback) {
    runSequence(
        'clean',
        'nodemon',
        callback);
});

gulp.task('clean', function(callback) {
    del([config.dirs.dist + '*', config.dirs.server + '*'])
        .then(function() {
            callback();
        });
});

gulp.task('nodemon', ['webpack'], function() {
    nodemon({
        script: path.join('server/dist/index.js'),
        watch: ['server/dist/index.js']
    }).on('restart', function() {
        gutil.log(gutil.colors.cyan('at-the-movies restarted...'));
    });
});

// webpack

function onBuild(done) {
    return function(err, stats) {
        if (err) {
            gutil.log('Webpack:', gutil.colors.red('Compilation error'));
            if (done) {
                done(err);
            }
        } else {
            Object.keys(stats.compilation.assets).forEach(function(key) {
                gutil.log('Webpack: output ', gutil.colors.green(key));
            });
            gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.compilation.name));
            if (done) {
                done();
            }
        }
    }
}

//dev watch
gulp.task('webpack-client-watch', function() {
    webpack(devConfig[0]).watch(100, function(err, stats) {
        onBuild()(err, stats);
    });
});

gulp.task('webpack-server-watch', function() {
    webpack(devConfig[1]).watch(100, function(err, stats) {
        onBuild()(err, stats);
    });
});


//group
gulp.task('webpack', ['webpack-client-watch', 'webpack-server-watch']);


//fixes nodemon process hanging issue
process.once('SIGINT', function(){
    process.exit(0);
});
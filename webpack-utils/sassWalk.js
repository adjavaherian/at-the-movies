var fs = require('fs');
var walk = function(dirs, ignore) {
    //console.log('dirs', dirs, 'ignore', ignore);
    var results = [];

    dirs.forEach(function(dir) {
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
            var stat = fs.statSync(file);
            //console.log('file', file);
            if (stat && stat.isDirectory() && ignore.indexOf(file) === -1) {
                results = results.concat(walk([file], ignore));
            } else if (stat && ignore.indexOf(file) > -1) {
                //console.log('ignoring', file);
                return
            } else {
                results.push(file);
            }
        });

    });

    return results
};

module.exports = walk;


//var sassWalk = require('hotpads-web/sassWalk');
//var sassResults = sassWalk(['/hotpads-web/app/templates', '/hotpads-web/app/core', '/hotpads-web/app/pages', '/hotpads-web/app/modules'], ['foo']);
//var prefetchPlugins = [];
//for(var i = 0; i < sassResults.length; i++) {
//    prefetchPlugins.push( new webpack.PrefetchPlugin(sassResults[i]) );
//}

//.concat(prefetchPlugins)
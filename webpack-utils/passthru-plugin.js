//new PassthruPlugin([{entry: 'analytics', output: 'analytics.js'}]),

function PassthruPlugin(options) {
    this.options = options || {};
}

PassthruPlugin.prototype.apply = function(compiler) {

    var options = this.options;
    var rawRequest = '';

    function checkRequest(module) {
        return module.rawRequest === rawRequest;
    }

    compiler.plugin('emit', function(compilation, callback) {

        for(var i in options) {

            var filename = options[i].entry;
            rawRequest = compilation.options.entry[filename];

            var foundModule = compilation.modules.filter(checkRequest);
            var source = foundModule[0]._source._value;

            compilation.assets[options[i].output] = {
                source: function() {
                    return source.toString('utf8');
                },
                size: function() {
                    return source.toString('utf8').length;
                }
            };
        }

        callback();
    });
};

module.exports = PassthruPlugin;

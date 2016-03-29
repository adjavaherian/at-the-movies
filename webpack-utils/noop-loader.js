//noop loader for skipping sources

module.exports = function() {

    this.cacheable && this.cacheable();
    return ''
};

module.exports.raw = true;

/* eslint-disabled */

if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            'use strict';
            var to;
            var i;
            var nextSource;
            var keysArray;
            var nextIndex;
            var nextKey;
            var desc;
            var len;

            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            to = Object(target);
            for (i = 1; i < arguments.length; i++) {
                nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                keysArray = Object.keys(nextSource);
                for (nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    nextKey = keysArray[nextIndex];
                    desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

module.exports = null;

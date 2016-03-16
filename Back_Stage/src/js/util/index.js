var utilsModule = ['./dom.js', './cookies.js']

var utils = {};

utils.mixin = function(source, target) {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            source[i] = target[i];
        }
    }
    return source;
}

utilsModule.forEach(function(item) {
    utils.mixin(utils, require(item));
})

module.exports = utils;

'use strict';

var utils = {};

utils.getAllItemsLen = function(mainCode) {
    if (mainCode) {
        var len = 0;
        for (var i = 0; i < mainCode.pages.length; i++) {
            len += mainCode.pages[i].items.length;
        }
        return len;
    }
};


module.exports = utils;

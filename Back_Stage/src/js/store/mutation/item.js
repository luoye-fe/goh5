'use strict';

var mutations = {};

var tpl = require('../../template/tpl.js');
var utils = require('utils');

mutations.ADDTEXT = function(state) {
    var index = state.currentPageData.items.length + 1;
    var num = utils.getAllItemsLen(state.mainCode) + 1;
    var model = tpl.txt(index, num);
    state.currentPageData.items.push(model);
    mutations.SELECTITEM(state, 'n_' + num);
};
mutations.SELECTITEM = function(state, itemId, multi) {
    if (multi) {
        state.checkedItems.push(itemId);
    } else {
        state.checkedItems = [];
        state.checkedItems.push(itemId);
    }
};

module.exports = mutations;

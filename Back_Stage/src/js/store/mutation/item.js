'use strict';

var mutations = {};

var tpl = require('../../template/tpl.js');
var utils = require('utils');

mutations.ADDTEXT = function(state) {
    var index = state.currentPageData.items.length + 1;
    var num = utils.getAllItemsLen() + 1;
    var model = tpl.txt(index, num);
    state.currentPageData.items.push(model);
    mutations.SELECTITEM(state, index - 1);
};

mutations.SELECTITEM = function(state, index, multi) {
    if (multi) {
        state.checkedItems.push(index);
    } else {
        state.checkedItems = [];
        state.checkedItems.push(index);
    }
};

module.exports = mutations;

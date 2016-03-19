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

mutations.ADDPICORBG = function(state, src, type) {
    if (type === 'pic') {
        state.checkedItems = [];
        var index = state.currentPageData.items.length + 1;
        var num = utils.getAllItemsLen() + 1;
        var model = tpl.pic(index, num, src);
        state.currentPageData.items.push(model);
        mutations.SELECTITEM(state, index - 1);
    } else if (type === 'bg') {
        state.currentPageMain.background = src;
    }
};

mutations.DELBG = function(state){
    state.currentPageMain.background = '#fff';
}

mutations.SELECTITEM = function(state, index, multi) {
    if (multi) {
        state.checkedItems.push(index);
    } else {
        state.checkedItems = [];
        state.checkedItems.push(index);
    }
};

mutations.REMOVEALLITEMS = function(state, index, multi) {
    state.checkedItems = [];
};

module.exports = mutations;

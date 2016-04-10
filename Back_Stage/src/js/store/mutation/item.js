'use strict';

var mutations = {};

var tpl = require('../../template/tpl.js');
var utils = require('utils');

mutations.ADDTEXT = function(state) {
    var index = state.currentPageData.items.length + 1;
    var num = utils.getAllItemsLen() + 1;
    var model = tpl.txt(index, num, {});
    state.currentPageData.items.push(model);
    mutations.SELECTITEM(state, index - 1);
};

mutations.CHANGETEXT = function(state, html, itemIndex) {
    state.currentPageData.items[itemIndex].content = state.currentPageData.items[itemIndex].content.replace(/\>[\s\S]+\</, '>' + html + '<');
}

mutations.ADDPICORBG = function(state, src, type) {
    if (type === 'pic') {
        state.checkedItems = [];
        var index = state.currentPageData.items.length + 1;
        var num = utils.getAllItemsLen() + 1;
        var model = tpl.pic(index, num, {
            src: src
        });
        state.currentPageData.items.push(model);
        mutations.SELECTITEM(state, index - 1);
    } else if (type === 'bg') {
        state.currentPageMain.background = src;
    }
};

mutations.DELBG = function(state) {
    state.currentPageMain.background = '#fff';
}

mutations.ADDBGMUSIC = function(state, src, name) {
    state.mainCode.wholeAttr.bgmusic = src;
    state.mainCode.wholeAttr.bgmusicName = name;
}

mutations.DElBGMUSIC = function(state) {
    state.mainCode.wholeAttr.bgmusic = '';
    state.mainCode.wholeAttr.bgmusicName = '';
}

mutations.SELECTITEM = function(state, index, multi) {
    if (multi) {
        state.checkedItems.push(index);
    } else {
        state.checkedItems = [];
        state.checkedItemDataOnlyOne = state.currentPageData.items[index];
        state.checkedItems.push(index);
    }
};

mutations.CLEARCHECKEDITEMS = function(state, index, multi) {
    state.checkedItems = [];
};

mutations.DELITEM = function(state) {
    var result = [];
    for (var i = 0; i < state.checkedItems.length; i++) {
        var result = [];
        delete state.currentPageData.items[state.checkedItems[i]];
    }
    for (var i = 0; i < state.currentPageData.items.length; i++) {
        if (state.currentPageData.items[i] !== undefined) {
            result.push(state.currentPageData.items[i]);
        }
    }
    state.currentPageData.items = result;
}


module.exports = mutations;

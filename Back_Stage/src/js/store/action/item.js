'use strict';

var actions = {};

actions.addText = function(store) {
    store.dispatch('ADDTEXT');
}

actions.changeText = function(store, html) {
    store.dispatch('CHANGETEXT', html);
}

actions.addPicOrBg = function(store, src, type) {
    store.dispatch('ADDPICORBG', src, type);
    store.dispatch('HIDEMATERIALLIB');
}

actions.delBg = function(store) {
    store.dispatch('DELBG');
}

actions.selectItem = function(store, index, multi) {
    store.dispatch('SELECTITEM', index, multi);
}

actions.clearCheckedItems = function(store) {
    store.dispatch('clearCheckedItems');
}

module.exports = actions;

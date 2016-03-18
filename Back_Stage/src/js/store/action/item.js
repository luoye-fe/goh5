'use strict';

var actions = {};

actions.addText = function(store) {
    store.dispatch('ADDTEXT');
}

actions.addPic = function(store, src) {
    store.dispatch('ADDPIC', src);
    store.dispatch('HIDEMATERIALLIB');
}

actions.selectItem = function(store, index, multi) {
    store.dispatch('SELECTITEM', index, multi);
}

actions.removeAllItems = function(store) {
    store.dispatch('REMOVEALLITEMS');
}

module.exports = actions;

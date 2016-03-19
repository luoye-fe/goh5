'use strict';

var actions = {};

actions.addText = function(store) {
    store.dispatch('ADDTEXT');
}

actions.addPicOrBg = function(store, src, type) {
    store.dispatch('ADDPICORBG', src, type);
    store.dispatch('HIDEMATERIALLIB');
}

actions.delBg = function(store){
	store.dispatch('DELBG');
}

actions.selectItem = function(store, index, multi) {
    store.dispatch('SELECTITEM', index, multi);
}

actions.removeAllItems = function(store) {
    store.dispatch('REMOVEALLITEMS');
}

module.exports = actions;

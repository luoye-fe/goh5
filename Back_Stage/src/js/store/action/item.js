'use strict';

var actions = {};

actions.addText = function(store) {
    store.dispatch('ADDTEXT');
}

actions.changeText = function(store, html, itemIndex) {
    store.dispatch('CHANGETEXT', html, itemIndex);
}

actions.addPicOrBg = function(store, src, type) {
    store.dispatch('ADDPICORBG', src, type);
    store.dispatch('HIDEMATERIALLIBPIC');
}

actions.delBg = function(store) {
    store.dispatch('DELBG');
}

actions.addBgMusic = function(store, src, name) {
    store.dispatch('ADDBGMUSIC', src, name);
}

actions.delBgMusic = function(store) {
    store.dispatch('DElBGMUSIC');
}

actions.selectItem = function(store, index, multi) {
    store.dispatch('SELECTITEM', index, multi);
}

actions.clearCheckedItems = function(store) {
    store.dispatch('CLEARCHECKEDITEMS');
}

actions.delItem = function(store) {
    store.dispatch('DELITEM');
}

module.exports = actions;

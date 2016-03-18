'use strict';


var actions = {};


actions.selectPage = function(store, idnex) {
    store.dispatch('SELECTPAGE', idnex);
}

actions.addPage = function(store) {
    store.dispatch('ADDPAGE');
}

actions.delPage = function(store, index) {
    store.dispatch('DELPAGE', index);
}

module.exports = actions;

'use strict';


var actions = {};


actions.selectPage = function(store, idnex) {
    store.dispatch('SELECTPAGE', idnex);
}

actions.addPage = function(store) {
    store.dispatch('ADDPAGE');
}


module.exports = actions;
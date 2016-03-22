'use strict';

var actions = {};

actions.setStyle = function(store, index, params, isIn) {
    store.dispatch('SETSTYLE', index, params, isIn);
}

actions.addClass = function(store, index, className) {
    store.dispatch('ADDCLASS', index, className);
}

actions.removeClass = function(store, index, className) {
    store.dispatch('REMOVECALSS', index, className);
}


module.exports = actions;

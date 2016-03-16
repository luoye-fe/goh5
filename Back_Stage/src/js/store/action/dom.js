'use strict';

var actions = {};

actions.setStyle = function(store, index, params, isIn) {
    store.dispatch('SETSTYLE', index, params, isIn);
}

module.exports = actions;

'use strict';

var actions = {};

actions.addText = function(state) {
    state.dispatch('ADDTEXT');
}

actions.selectItem = function(state, id, multi) {
    state.dispatch('SELECTITEM', id, multi);
}

module.exports = actions;
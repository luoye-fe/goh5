'use strict';


var actions = {};


actions.selectPage = function(state, idnex) {
    state.dispatch('SELECTPAGE', idnex);
}

actions.addPage = function(state) {
    state.dispatch('ADDPAGE');
}


module.exports = actions;
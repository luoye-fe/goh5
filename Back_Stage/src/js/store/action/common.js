'use strict';

var actions = {};

actions.alert = function(store, params) {
    store.dispatch('ALERT', params);
    setTimeout(function(){
    	store.dispatch('HIDEALERT');
    }, 2500);
}

module.exports = actions;

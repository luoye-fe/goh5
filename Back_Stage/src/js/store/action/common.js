'use strict';

var actions = {};

actions.alert = function(store, params) {
    store.dispatch('ALERT', params);
    setTimeout(function() {
        store.dispatch('HIDEALERT');
    }, 2500);
}

actions.confirm = function(store, params) {
	store.dispatch('CONFIRM', params);
}
actions.hideConfirm = function(store) {
	store.dispatch('HIDECONFIRM');
}

module.exports = actions;

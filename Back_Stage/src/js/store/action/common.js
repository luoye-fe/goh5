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

actions.materialLibPic = function(store,params){
	store.dispatch('MATERIALLIBPIC', params);
}

actions.hideMaterialLibPic = function(store){
	store.dispatch('HIDEMATERIALLIBPIC');
}

actions.materialLibMusic = function(store,params){
	store.dispatch('MATERIALLIBMUSIC', params);
}

actions.hideMaterialLibMusic = function(store){
	store.dispatch('HIDEMATERIALLIBMUSIC');
}

module.exports = actions;

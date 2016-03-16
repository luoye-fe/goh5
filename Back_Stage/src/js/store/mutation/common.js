'use strict';

var mutations = {};

mutations.ALERT = function(state, params) {
	state.alertObj.show = params.show;
	state.alertObj.msg = params.msg || '提示信息';
	state.alertObj.type = params.type || 'info';
}
mutations.HIDEALERT = function(state){
	state.alertObj.show = false;
}

mutations.CONFIRM = function(state, params){
	state.confirmObj.show = params.show;
	state.confirmObj.msg = params.msg || '提示信息';
	state.confirmObj.event = params.event || null;
}
mutations.HIDECONFIRM = function(state){
	state.confirmObj.show = false;
}

module.exports = mutations;

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

module.exports = mutations;

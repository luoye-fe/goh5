'use strict';

var mutations = {};

mutations.ALERT = function(state, params) {
    state.alertObj.show = params.show;
    state.alertObj.msg = params.msg || '提示信息';
    state.alertObj.type = params.type || 'info';  // info/warning/success/danger
}

mutations.HIDEALERT = function(state) {
    state.alertObj.show = false;
}

mutations.CONFIRM = function(state, params) {
    state.confirmObj.show = params.show;
    state.confirmObj.msg = params.msg || '提示信息';
    state.confirmObj.event = params.event || null;
}
mutations.HIDECONFIRM = function(state) {
    state.confirmObj.show = false;
}

mutations.MATERIALLIB = function(state, params) {
    state.materialLibObj.show = params.show;
    state.materialLibObj.msg = params.msg || '素材库';
    state.materialLibObj.type = params.type || 'pic';
}

mutations.HIDEMATERIALLIB = function(state) {
    state.materialLibObj.show = false;
}

module.exports = mutations;

'use strict';

var $ = require('jQuery');

var actions = {}

actions.initData = function(state, id, cb) {
    $.ajax({
        url: '/api/work/getWork',
        type: 'get',
        data: {
            _id: id
        },
        success: function(data) {
            state.dispatch('INITDATA', data.data);
            cb && cb(data);
        }
    })
}

actions.selectPage = function(state, idnex){
	state.dispatch('SELECTPAGE', idnex);
}

actions.addPage = function(state){
	state.dispatch('ADDPAGE');
}

actions.addText = function(state){
	state.dispatch('ADDTEXT');
}



module.exports = actions;

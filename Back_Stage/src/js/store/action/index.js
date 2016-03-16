'use strict';

var $ = require('jQuery');

var utils = require('utils');

var actionModule = ['./item.js','./page.js']

var actions = {};

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

actionModule.forEach(function(item){
	utils.mixin(actions,require(item));
})


module.exports = actions;
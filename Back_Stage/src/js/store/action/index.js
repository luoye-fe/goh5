'use strict';

var $ = require('jQuery');

var utils = require('utils');

var actionModule = ['./item.js', './page.js', './dom.js', './common.js'];

var actions = {};

actions.initData = function(store, id, cb) {
    $.ajax({
        url: '/api/work/getWork',
        type: 'get',
        data: {
            _id: id
        },
        success: function(data) {
            store.dispatch('INITDATA', data.data);
            cb && cb(data);
        }
    })
}

actionModule.forEach(function(item) {
    utils.mixin(actions, require(item));
})


module.exports = actions;

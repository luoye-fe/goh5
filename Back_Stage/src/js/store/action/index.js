'use strict';
var $ = require('jQuery');

var utils = require('utils');

var item = require('./item.js');
var page = require('./page.js');
var dom = require('./dom.js');
var common = require('./common.js');

var actions = {};

actions.initData = function(store, id, cb) {
    $.ajax({
        url: '/api/work/getWork',
        type: 'get',
        data: {
            _id: id
        },
        success: function(data) {
            if (!data.iserro) {
                store.dispatch('INITDATA', data.data);
            }
            cb && cb(data);
        }
    })
}

utils.mixin(actions, item);
utils.mixin(actions, page);
utils.mixin(actions, dom);
utils.mixin(actions, common);

module.exports = actions;

'use strict';
var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../store/store.js');
var actions = require('../store/action/index.js');

var utils = require('utils');

Vue.directive('operateItem', function() {
    var _this = this;
    var target = this.el;

    $(target).bind('dblclick', function() {
        if ($(target).attr('type') !== 'txt') {
            return;
        }
        // 文本编辑操作
    })

    // 拖动元素
    $(target).bind('mousedown', function() {
        var index = $(target).attr('index');
        

        actions.setStyle(store, index, {
            top: '10%',
            left: '20%'
        })
    })
})

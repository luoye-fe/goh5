'use strict';
var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../store/store.js');
var actions = require('../store/action/index.js');

var utils = require('utils');
var popline = require('popline');

Vue.directive('editTextItem', function() {
    var _this = this;
    var target = this.el;

    $(target).bind('dblclick', function() {
        var itemIndex = store.state.checkedItems[0];
        if ($(target).attr('type') !== 'txt') {
            return;
        }
        $(target).find('.content>div').attr('contenteditable', true);
        $(target).css('cursor', 'auto');
        $(target).find('.content>div').popline({ position: 'fixed'});
        var obj = $(target).find('.content>div')[0];
        window.getSelection().selectAllChildren(obj);

        $(target).find('.content>div').bind('blur', function() {
            var html = $(target).find('.content>div').html();
            // 修改数据|还原状态
            actions.changeText(store, html, itemIndex);
            $(target).find('.content>div').popline("destroy");
            $(target).css('cursor', 'pointer');
            $(target).find('.content>div').attr('contenteditable', false);
            $(target).find('.content>div').unbind('blur')
        });
    })
})

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
    $(target).find('.content').bind('mousedown', function(ev) {
        var conWidth = parseFloat($('.j_screen').css('width'));
        var conHeight = parseFloat($('.j_screen').css('height'));

        var preClientX = ev.clientX;
        var preClientY = ev.clientY;

        var itemLeft, itemTop;

        $(window).bind('mousemove', function(ev) {
            for (var i = 0; i < store.state.checkedItems.length; i++) {
                var obj = $('.j_screen').children().eq(store.state.checkedItems[i]);

                itemLeft = itemLeft ? itemLeft : parseFloat(obj.css('left'));
                itemTop = itemTop ? itemTop : parseFloat(obj.css('top'));

                var difX = ev.clientX - preClientX;
                var difY = ev.clientY - preClientY;

                var x = difX + itemLeft;
                var y = difY + itemTop;

                var alertMsg = {
                    show: true,
                    msg: '超出屏幕外的元素将不可见',
                    type: 'warning'
                }

                if (x < 0 || y < 0 || parseFloat(obj.outerWidth()) + parseFloat(obj.css('left')) > conWidth || parseFloat(obj.outerHeight()) + parseFloat(obj.css('top')) > conHeight) {
                    if(!store.state.alertObj.show){
                        actions.alert(store, alertMsg);
                    }
                }
                actions.setStyle(store, store.state.checkedItems[i], {
                    left: (x / conWidth * 100).toFixed(1) + '%',
                    top: (y / conHeight * 100).toFixed(1) + '%'
                })
            }
            return false;
        });
        $(window).bind('mouseup', function() {
            $(window).unbind('mousemove');
            $(window).unbind('mouseup');
        });
    })
})

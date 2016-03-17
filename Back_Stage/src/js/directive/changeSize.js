'use strict';
var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../store/store.js');
var actions = require('../store/action/index.js');

var utils = require('utils');

Vue.directive('changeSize', function() {
    var _this = this;
    var target = this.el;

    var bindEvent = function(obj, index) {
        obj.bind('mousedown', function(ev) {
            var conWidth = parseFloat($('.j_screen').css('width'));
            var conHeight = parseFloat($('.j_screen').css('height'));

            var preClientX = ev.clientX;
            var preClientY = ev.clientY;

            var itemWidth = parseFloat($(target).width());
            var itemHeight = parseFloat($(target).height());

            var itemLeft = itemLeft ? itemLeft : parseFloat($(target).css('left'));
            var itemTop = itemTop ? itemTop : parseFloat($(target).css('top'));

            var btnIndex = obj.index('.edit_mode');

            $(window).bind('mousemove', function(ev) {

                var difX = ev.clientX - preClientX;
                var difY = ev.clientY - preClientY;

                var styleParams = {};
                switch (btnIndex) {
                    case 0:
                        if ((itemWidth - difX) > 3 && (itemHeight - difY) > 3) {
                            if (ev.shiftKey) {
                                styleParams = {
                                    width: (((itemWidth - difX) / conWidth) * 100).toFixed(1) + '%',
                                    height: ((itemHeight / itemWidth * (itemWidth - difX) / conHeight) * 100).toFixed(1) + '%',
                                    left: (((itemLeft + difX) / conWidth) * 100).toFixed(1) + '%',
                                    top: (((itemTop + itemHeight / itemWidth * difX) / conHeight) * 100).toFixed(1) + '%'
                                }
                            } else {
                                styleParams = {
                                    width: (((itemWidth - difX) / conWidth) * 100).toFixed(1) + '%',
                                    height: (((itemHeight - difY) / conHeight) * 100).toFixed(1) + '%',
                                    left: (((itemLeft + difX) / conWidth) * 100).toFixed(1) + '%',
                                    top: (((itemTop + difY) / conHeight) * 100).toFixed(1) + '%'
                                }
                            }
                        }
                        break;
                    case 1:
                        if ((itemHeight - difY) > 3) {
                            styleParams = {
                                height: (((itemHeight - difY) / conHeight) * 100).toFixed(1) + '%',
                                top: (((itemTop + difY) / conHeight) * 100).toFixed(1) + '%'
                            }
                        }
                        break;
                    case 2:
                        if ((itemWidth - difX) > 3 && (itemHeight - difY) > 3) {
                            if (ev.shiftKey) {
                                styleParams = {
                                    width: (((itemWidth + difX) / conWidth) * 100).toFixed(1) + '%',
                                    height: ((itemHeight / itemWidth * (itemWidth + difX) / conHeight) * 100).toFixed(1) + '%',
                                    top: (((itemTop - itemHeight / itemWidth * difX) / conHeight) * 100).toFixed(1) + '%'
                                }
                            } else {
                                styleParams = {
                                    width: (((itemWidth + difX) / conWidth) * 100).toFixed(1) + '%',
                                    height: (((itemHeight - difY) / conHeight) * 100).toFixed(1) + '%',
                                    top: (((itemTop + difY) / conHeight) * 100).toFixed(1) + '%'
                                }
                            }
                        }
                        break;
                    case 3:
                        if ((itemWidth - difX) > 3) {
                            styleParams = {
                                width: (((itemWidth + difX) / conWidth) * 100).toFixed(1) + '%'
                            }
                        }
                        break;
                    case 4:
                        if ((itemWidth - difX) > 3 && (itemHeight - difY) > 3) {
                            if (ev.shiftKey) {
                                styleParams = {
                                    width: (((itemWidth + difX) / conWidth) * 100).toFixed(1) + '%',
                                    height: (((itemHeight / itemWidth * (itemWidth + difX)) / conHeight) * 100).toFixed(1) + '%'
                                }
                            } else {
                                styleParams = {
                                    width: (((itemWidth + difX) / conWidth) * 100).toFixed(1) + '%',
                                    height: (((itemHeight + difY) / conHeight) * 100).toFixed(1) + '%'
                                }
                            }
                        }
                        break;
                    case 5:
                        if ((itemHeight - difY) > 3) {
                            styleParams = {
                                height: (((itemHeight + difY) / conHeight) * 100).toFixed(1) + '%'
                            }
                        }
                        break;
                    case 6:
                        if ((itemWidth - difX) > 3 && (itemHeight - difY) > 3) {
                            if (ev.shiftKey) {
                                styleParams = {
                                    width: (((itemWidth - difX) / conWidth) * 100).toFixed(1) + '%',
                                    height: (((itemHeight / itemWidth * (itemWidth + difY)) / conHeight) * 100).toFixed(1) + '%',
                                    left: (((itemLeft + difX) / conWidth) * 100).toFixed(1) + '%'
                                }
                            } else {
                                styleParams = {
                                    width: (((itemWidth - difX) / conWidth) * 100).toFixed(1) + '%',
                                    height: (((itemHeight + difY) / conHeight) * 100).toFixed(1) + '%',
                                    left: (((itemLeft + difX) / conWidth) * 100).toFixed(1) + '%'
                                }
                            }
                        }
                        break;
                    case 7:
                        if ((itemWidth - difX) > 3) {
                            styleParams = {
                                width: (((itemWidth - difX) / conWidth) * 100).toFixed(1) + '%',
                                left: (((itemLeft + difX) / conWidth) * 100).toFixed(1) + '%'
                            }
                        }
                        break;
                }
                actions.setStyle(store, store.state.checkedItems[0], styleParams);
            })
            $(window).bind('mouseup', function() {
                $(window).unbind('mousemove');
                $(window).unbind('mouseup');
            });
        })
    }

    for (var i = 0; i < $(target).find('.edit_mode').length; i++) {
        bindEvent($(target).find('.edit_mode').eq(i), i);
    }
})

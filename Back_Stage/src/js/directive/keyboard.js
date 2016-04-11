'use strict';

var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../store/store.js');
var actions = require('../store/action/index.js');

var utils = require('utils');

var moveItem = function(direction) {
    for (var i = 0; i < store.state.checkedItems.length; i++) {
        var obj = $('.j_screen>div').eq(store.state.checkedItems[i]);
        var objLeft = parseFloat(obj.css('left'));
        var objTop = parseFloat(obj.css('top'));
        var cssObj = {};
        switch (direction) {
            case 'top':
                cssObj.top = objTop - 1 + 'px';
                break;
            case 'right':
                cssObj.left = objLeft + 1 + 'px';
                break;
            case 'left':
                cssObj.left = objLeft - 1 + 'px';
                break;
            case 'down':
                cssObj.top = objTop + 1 + 'px';
                break;
        }
        actions.setStyle(store, store.state.checkedItems[i], cssObj)
    }
}

var delItem = function() {
    actions.delItem(store);
}

var copyItem = function() {

}

var paste = function() {

}

Vue.directive('keyboard', function() {
    $(window).keydown(function(ev) {
        var preventKeyboard = !store.state.checkedItems.length || $('.j_screen>div').eq(store.state.checkedItems[0]).find('.content>div').attr('contenteditable') === 'true' || $('input:focus').length;
        if(preventKeyboard){
            return;
        }
        var keyCode = event.keyCode;
        if (keyCode === 38) { // 上
            moveItem('top');
            return false;
        } else if (keyCode === 40) { // 下
            moveItem('down');
            return false;
        } else if (keyCode === 37) { // 左
            moveItem('left');
            return false;
        } else if (keyCode === 39) { // 右
            moveItem('right');
            return false;
        } else if ((keyCode === 8 || keyCode === 46)) { // 删除
            delItem();
            return false;
        } else if ((event.ctrlKey || event.metaKey) && keyCode === 67) { // 复制
            console.log('copy');
            return false;
        } else if ((event.ctrlKey || event.metaKey) && keyCode === 86) { // 粘贴
            console.log('paste');
            return false;
        } else if ((event.ctrlKey || event.metaKey) && keyCode === 65) { // 全选
            console.log('selectall');
            return false;
        }
    })
})

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

var delItem = function(){
	actions.delItem(store);
}

var copyItem = function(){
	
}

var paste = function(){

}

Vue.directive('keyboard', function() {
    $(window).keydown(function(ev) {
        if (!store.state.checkedItems.length) {
            return;
        }
        var keyCode = event.keyCode;
        if (keyCode === 38) { // 上
            moveItem('top');
        } else if (keyCode === 40) { // 下
            moveItem('down');
        } else if (keyCode === 37) { // 左
            moveItem('left');
        } else if (keyCode === 39) { // 右
            moveItem('right');
        } else if (keyCode === 8 || keyCode === 46) { // 删除
        	delItem();
        } else if ((event.ctrlKey || event.metaKey) && keyCode === 67) { // 复制
            console.log('copy');
        } else if ((event.ctrlKey || event.metaKey) && keyCode === 86) { // 粘贴
            console.log('paste');
        } else if ((event.ctrlKey || event.metaKey) && keyCode === 65) { // 全选
            console.log('selectall');
        }
        return false;
    })
})

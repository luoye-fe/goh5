'use strict';

var $ = require('jQuery');

var utils = {};

module.exports = utils;

utils.mixin = function(source, target) {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            source[i] = target[i];
        }
    }
    return source;
}

var store = require('../store/store.js');

utils.setCookie = function(name, value, minute) {
    var date = new Date();
    var minute = minute ? minute : 2;
    date.setTime(date.getTime() + (minute * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
};

utils.getCookie = function(name) {
    var cookies = {};
    var cookiesArr = document.cookie.replace(/\s+/g, '').split(';');
    for (var i = 0; i < cookiesArr.length; i++) {
        var _arr = cookiesArr[i].split('=');
        cookies[_arr[0]] = _arr[1];
    }
    return cookies[name];
};

utils.delCookie = function(name) {
    this.setCookie(name, "", -1);
};


utils.getAllItemsLen = function() {
    var len = 0;
    for (var i = 0; i < store.state.mainCode.pages.length; i++) {
        len += store.state.mainCode.pages[i].items.length;
    }
    return len;
};

utils.getStyle = function(index, cssStyle, isIn) {
    var str = isIn ? store.state.currentPageData.items[index].content.match(/style=\"([\s\S]+?)\"/)[1] : store.state.currentPageData.items[index].style;
    var result = {};
    var _arr1 = str.split(';');
    for (var i = 0; i < _arr1.length; i++) {
        var _arr2 = _arr1[i].split(':');
        if (_arr2[0] !== '') {
            _arr2[0] = _arr2[0].replace(/(^\s+)|(\s+$)/g, '');
            _arr2[1] = _arr2[1].replace(/(^\s+)|(\s+$)/g, '');
            result[_arr2[0]] = _arr2[1];
        }
        if (cssStyle == _arr2[0] && cssStyle !== 'all') {
            return _arr2[1];
        }
    }
    if (cssStyle === 'all') {
        return result;
    }
    return null;
}

utils.checkIsColor = function(strColor) {
    var oSpan = document.createElement('span');
    oSpan.style.color = strColor;
    if (oSpan.style.color != "") {
        return true;
    } else {
        return false;
    }
    oSpan = null;
}

utils.attachmentSizeFormat = function(fileSize, level){
    var unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (fileSize < 1024) {
        return fileSize.toFixed(2) + unit[level];
    } else {
        return utils.attachmentSizeFormat(fileSize / 1024, ++level);
    }
}

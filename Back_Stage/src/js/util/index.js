'use strict';

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

utils.getStyle = function(index, style, isIn) {
	var str = isIn ? store.state.currentPageData.items[index].content.match(/style=\"([\s\S]+)\"/)[1] : store.state.currentPageData.items[index].style;
	str = str.replace(/[\s]/ig, '')
	var _arr1 = str.split(';');
	for (var i = 0; i < _arr1.length; i++) {
	    var _arr2 = _arr1[i].split(':');
	    if (style == _arr2[0]) {
	        return _arr2[1];
	    }
	}
	return null;
}





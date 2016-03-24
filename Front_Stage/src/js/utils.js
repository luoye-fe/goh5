'use strict';

var utils = {};

utils.$ = new Swiper().$;

utils.setCookie = function(name, value, minute) {
    var date = new Date();
    if (minute === undefined) {
        minute = 2;
    }
    date.setTime(date.getTime() + (minute * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
};

utils.getCookie = function(name) {
    var cookies = {};
    var cookiesArr = document.cookie.split(';');
    for (var i = 0; i < cookiesArr.length; i++) {
        var _arr = cookiesArr[i].split('=');
        cookies[_arr[0]] = _arr[1];
    }
    return cookies[name];
};

utils.delCookie = function(name) {
    this.setCookie(name, "", -1);
};

utils.styleJson = function(styleString) {
    var result = {};
    var _arr = styleString.split(';');
    for (var i = 0; i < _arr.length; i++) {
        if (_arr[i] !== '') {
            var _current = _arr[i].split(':');
            result[_current[0]] = _current[1];
        }
    }
    return result;
};

utils.viewData = function() {
    var w = win,
        body = doc.body,
        dd = doc.documentElement,
        W = w.innerWidth || dd.clientWidth || body.clientWidth || 0,
        H = w.innerHeight || dd.clientHeight || body.clientHeight || 0;
    return {
        "scrollTop": body.scrollTop || dd.scrollTop || w.pageYOffset,
        "scrollLeft": body.scrollLeft || dd.scrollLeft || w.pageXOffset,
        "documentWidth": Math.max(body.scrollWidth, dd.scrollWidth || 0),
        "documentHeight": Math.max(body.scrollHeight, dd.scrollHeight || 0, H),
        "viewWidth": W,
        "viewHeight": H
    };
};

utils.unduplicate = function(arr) {
    var obj = {},
        i = 0,
        len = 0;
    if (Array.isArray(arr) && arr.length > 0) {
        len = arr.length;
        for (i = 0; i < len; i += 1) {
            obj[arr[i]] = arr[i];
        }
        return Object.keys(obj);
    }
    return [];
}

module.exports = utils;
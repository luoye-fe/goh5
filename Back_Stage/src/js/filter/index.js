'use strict';

var Vue = require('Vue');
var $ = require('jQuery');

var utils = require('utils');

// 毫秒转标准日期
Vue.filter('Date', function(value, format) {
    return new Date(value).Format(format);
})

Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Vue.filter('Number', function(value, defaultNum) {
    if (isNaN(parseFloat(value))) {
        if (defaultNum) {
            return defaultNum;
        } else {
            return 0;
        }
    } else {
        return parseFloat(value);
    }
})

Vue.filter('FormatBg', function(value) {
    if (value && utils.checkIsColor(value)) {
        return 'background-color:' + value;
    } else if (value) {
        return 'background-image:url(' + value + ')';
    }
})

Vue.filter('FileSize', function(value) {
    return utils.attachmentSizeFormat(value,0);
})

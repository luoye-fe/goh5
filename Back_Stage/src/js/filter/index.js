'use strict';

var Vue = require('Vue');

// 毫秒转标准日期
Vue.filter('time', function(value) {
    var time = new Date(value);
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' +time.getSeconds();
})

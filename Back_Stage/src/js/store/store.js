'use strict';

var $ = require('jQuery');
var Vue = require('Vue');
var Vuex = require('Vuex');

Vue.use(Vuex);

var state = {
    workData: '',
    mainCode: '',
    pagesData: '',
    currentPage: 1,
    currentPageData: '',
    currentPageMain: '',
    checkedItems: [],
    checkedItemDataOnlyOne: '',
    alertObj:{
        show: false,
        msg: '提示信息',
        type: 'info' // 四种样式 success/info/warning/danger
    },
    confirmObj:{
        show: false,
        msg: '提示信息',
        event: 'func'
    },
    materialLibObj: {
        show: false,
        msg: '素材库',
        type: 'pic' // pic:图片 bg:背景 pics:图集 and so on
    }
}

var actions = require('./action/index.js');
var mutations = require('./mutation/index.js');

module.exports = new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})

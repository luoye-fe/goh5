'use strict';

// 数独的写操作都在vuex中，读操作不在此，比如获取css属性，在utils中，不放在这

var $ = require('jQuery');

var utils = require('utils');
var _ = require('lodash');

var item = require('./item.js');
var page = require('./page.js');
var dom = require('./dom.js');
var common = require('./common.js');

var mutations = {};

mutations.INITDATA = function(state, data) {
    if (localStorage[data._id] && localStorage[data._id] !== 'null' && !_.isEqual(JSON.parse(localStorage[data._id]), data) && confirm('检测到本地存在未保存数据，是否应用？')) {
        state.workData = JSON.parse(localStorage[data._id]);
    } else {
        state.workData = data;
    }
    state.mainCode = state.workData.mainCode;
    state.pagesData = state.mainCode.pages;
    state.wholeAttr = state.mainCode.wholeAttr;
    state.currentPageData = state.pagesData[state.currentPage - 1];
    state.currentPageMain = state.currentPageData.main;
    state.about = state.workData.about;
    state.setConfig = state.workData.setConfig;
};

mutationModule.forEach(function(item) {
    utils.mixin(mutations, require(item));
})


module.exports = mutations;

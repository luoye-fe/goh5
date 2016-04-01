'use strict';

// 数独的写操作都在vuex中，读操作不在此，比如获取css属性，在utils中，不放在这

var $ = require('jQuery');

var utils = require('utils');
var _ = require('lodash');

var mutationModule = ['./item.js', './page.js', './dom.js', './common.js'];

var mutations = {};

mutations.INITDATA = function(state, data) {
    state.workData = data;
    if (localStorage.mainCode !== 'null' && !_.isEqual(JSON.parse(localStorage.mainCode), data.mainCode) && confirm('检测到本地存在未保存数据，是否应用？')) {
        state.workData.mainCode = JSON.parse(localStorage.mainCode);
        state.mainCode = state.workData.mainCode;
        state.pagesData = state.mainCode.pages;
        state.wholeAttr = state.mainCode.wholeAttr;
        state.currentPageData = state.pagesData[state.currentPage - 1];
        state.currentPageMain = state.currentPageData.main;
        localStorage.mainCode = null;
    } else {
        state.mainCode = state.workData.mainCode;
        state.pagesData = state.mainCode.pages;
        state.wholeAttr = state.mainCode.wholeAttr;
        state.currentPageData = state.pagesData[state.currentPage - 1];
        state.currentPageMain = state.currentPageData.main;
    }
    state.about = state.workData.about;
    state.setConfig = state.workData.setConfig;
};

mutationModule.forEach(function(item) {
    utils.mixin(mutations, require(item));
})


module.exports = mutations;

'use strict';

// 数独的写操作都在vuex中，读操作不在此，比如获取css属性，在utils中，不放在这

var $ = require('jQuery');

var utils = require('utils');


var mutationModule = ['./item.js', './page.js', './dom.js', './common.js'];

var mutations = {};

mutations.INITDATA = function(state, data) {
    state.workData = data;
    state.mainCode = state.workData.mainCode;
    state.pagesData = state.mainCode.pages;
    state.currentPageData = state.pagesData[state.currentPage - 1];
    state.currentPageMain = state.currentPageData.main;
};

mutationModule.forEach(function(item) {
    utils.mixin(mutations, require(item));
})


module.exports = mutations;

'use strict';

var $ = require('jQuery');

var utils = require('utils');

var mutationModule = ['./item.js', './page.js']

var mutations = {};

mutations.INITDATA = function(state, data) {
    state.workData = data;
    state.mainCode = state.workData.mainCode;
    state.pagesData = state.workData.mainCode.pages;
    state.currentPageData = state.pagesData[state.currentPage - 1];
};

mutationModule.forEach(function(item) {
    utils.mixin(mutations, require(item));
})


module.exports = mutations;

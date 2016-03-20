'use strict';



var mutations = {};

mutations.SELECTPAGE = function(state, index) {
    state.currentPage = index;
    state.currentPageData = state.pagesData[state.currentPage - 1];
    state.checkedItems = [];
    state.currentPageMain = state.currentPageData.main;
};
mutations.ADDPAGE = function(state) {
    var model = {
        main: {
            background: '#fff',
            type: '',
            height: 486,
        },
        items: []
    }
    state.pagesData.push(model);
    state.currentPage = state.pagesData.length;
    state.currentPageData = state.pagesData[state.currentPage - 1];
    state.currentPageMain = state.currentPageData.main;
};

mutations.DELPAGE = function(state, index) {
    var result = [];
    state.pagesData = result.concat(state.pagesData.slice(0, index), state.pagesData.slice(index + 1));
    // concat/slide/filter 不会触发vue的数据更新，可以使用Object.assign() 但是。。es6～所以重新赋值下，vue中作了处理，性能不会损耗很多
    state.mainCode.pages = state.pagesData;
    state.currentPage = state.currentPage === 1 ? 1 : state.currentPage - 1;
    state.currentPageData = state.pagesData[state.currentPage - 1];
    state.currentPageMain = state.currentPageData.main;
}

module.exports = mutations;

// 数据流导向真神奇～～～

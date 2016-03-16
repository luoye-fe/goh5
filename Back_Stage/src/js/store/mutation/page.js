'use strict';

var mutations = {};

mutations.SELECTPAGE = function(state, index) {
    state.currentPage = index;
    state.currentPageData = state.pagesData[state.currentPage-1];
    state.checkedItems = [];
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
    state.currentPageData = state.pagesData[state.currentPage-1];
};

module.exports = mutations;
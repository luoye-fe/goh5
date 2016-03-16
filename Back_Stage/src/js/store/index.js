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
}

var tpl = require('../template/tpl.js');
var utils = require('utils');


var mutations = {
    INITDATA: function(state, data) {
        state.workData = data;
        state.mainCode = state.workData.mainCode;
        state.pagesData = state.workData.mainCode.pages;
        state.currentPageData = state.pagesData[state.currentPage-1];
    },
    SELECTPAGE: function(state, index) {
        state.currentPage = index;
        state.currentPageData = state.pagesData[state.currentPage-1];
    },
    ADDPAGE: function(state) {
        var model = {
            main: {
                background: '#fff',
                type: '',
                height: 504,
            },
            items: []
        }
        state.pagesData.push(model);
        state.currentPage = state.pagesData.length;
        state.currentPageData = state.pagesData[state.currentPage-1];
    },
    ADDTEXT: function(state){
    	var index = state.currentPageData.items.length + 1;
    	var num = utils.getAllItemsLen(state.mainCode) + 1;
    	var model = tpl.txt(index, num);
    	state.currentPageData.items.push(model);
    }

}

module.exports = new Vuex.Store({
    state,
    mutations,
    strict: true
})

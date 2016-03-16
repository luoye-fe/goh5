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
    checkedItems: []
}

var mutations = require('./mutation/index.js');

module.exports = new Vuex.Store({
    state,
    mutations,
    strict: true
})

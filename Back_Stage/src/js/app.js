'use strict';

var $ = require('jQuery');
var Vue = require('Vue');
var utils = require('utils');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var APP = Vue.extend({});

// vue component
var Home = require('./component/home/main.vue');
var List = require('./component/list/main.vue');
var Edit = require('./component/edit/main.vue');

router.map({
    '/': {
        component: Home
    },
    '/list': {
        component: List
    },
    '/edit/:id': {
        component: Edit
    }
});

router.beforeEach(function() {
    if (utils.getCookie('isLogin') !== '1') {
        router.go('/');
        return;
    }
    if(router.app.$route.path === '/' && utils.getCookie('isLogin') === '1'){
        router.go('/list');
        return;
    }
});

router.redirect({
    '*': '/'
});

router.start(APP, '#app');
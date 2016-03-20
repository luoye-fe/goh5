'use strict';

var $ = require('jQuery');
var Vue = require('Vue');
var utils = require('utils');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

Vue.config.debug = true;

// vue component
var Home = require('./component/home.vue');
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
})

router.beforeEach(function() {
    if (utils.getCookie('isLogin') != '1') {
        router.go('/');
    }
})

router.redirect({
    '*': '/'
})

var APP = Vue.extend({
    
});

router.start(APP, '#app');
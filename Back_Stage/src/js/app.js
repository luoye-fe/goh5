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
var List = require('./component/list.vue');



router.map({
    '/': {
        component: Home
    },
    '/list': {
        component: List
    }
})

router.beforeEach(function() {
    if (Number(utils.getCookie('isLogin'))) {
        router.go('/list');
    }else{
    	router.go('/');
    }
})

router.redirect({
    '*': '/'
})

var Blank = Vue.extend({});
router.start(Blank, '#app');

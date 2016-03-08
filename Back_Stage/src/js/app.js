'use strict';

var $ = require('jQuery');
var Vue = require('Vue');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

Vue.config.debug = true

// vue component
var Home = require('./component/home.vue');
var List = require('./component/list.vue');

var App = Vue.extend({});

router.map({
    '/': {
        component: Home
    },
    '/list': {
        component: List
    },
    // '/signup': {
    //     component: Signup
    // }
})

router.beforeEach(function() {
    window.scrollTo(0, 0)
})

router.redirect({
    '*': '/'
})

router.start(App, '#app')

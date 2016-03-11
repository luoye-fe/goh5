<template>
	<h1>欢迎来到 Go H5!</h1>
	<h2>请先登录！</h2>
	<a href="javascript:void(0)" v-on:click="showLogin = !showLogin">登录</a>
	<a href="javascript:void(0)" v-on:click="showSignup = !showSignup">注册</a>
	<m-login v-show="showLogin"></m-login>
	<m-signup v-show="showSignup"></m-signup>
</template>

<script>

var Vue = require('Vue');
var $ = require('jQuery');


var Login = require('./common/login.vue');
var Signup = require('./common/signup.vue');

Vue.component('m-login', Login);
Vue.component('m-signup', Signup);

var Home = {
	name: 'Home',
	data: function(){
		return {
			showLogin: false,
			showSignup: false,
		}
	},
	events: {
		'show-login': function(msg){
			this.showLogin = msg;
		},
		'show-signup': function(msg){
			this.showSignup = msg;
		}
	}
}
module.exports = Home;

</script>
<template>
	<h1>欢迎来到 Go H5!</h1>
	<a href="javascript:void(0)" v-on:click="showLogin = !showLogin">登录</a>
	<a href="javascript:void(0)" v-on:click="showSignup = !showSignup">注册</a>
	<login v-show="showLogin"></login>
	<signup v-show="showSignup"></signup>
</template>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

// 未完成：检测是否登录自动跳转

var Login = require('./login.vue');
var Signup = require('./signup.vue');

Vue.component('login', Login);
Vue.component('signup', Signup);

module.exports = {
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

</script>
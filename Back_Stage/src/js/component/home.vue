<template>
	<h1>欢迎来到 Go H5!</h1>
	<h2>请先登录！</h2>
	<a href="javascript:void(0)" @click="showLogin = !showLogin">登录</a>
	<a href="javascript:void(0)" @click="showSignup = !showSignup">注册</a>
	<m-login :show-login.sync="showLogin" :show-signup.sync="showSignup"></m-login>
	<m-signup :show-login.sync="showLogin" :show-signup.sync="showSignup"></m-signup>
</template>

<script>

var Vue = require('Vue');
var $ = require('jQuery');


var Login = require('./common/login.vue');
var Signup = require('./common/signup.vue');

var Home = Vue.extend({
	name: 'Home',
	data: function(){
		return {
			showLogin: false,
			showSignup: false,
		}
	}
})
module.exports = Home;

</script>
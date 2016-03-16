<template>
	<div class="dialog_con" v-show="showLogin" transition="fade">
		<div class="dialog_bg" @click="this.showLogin = false"></div>
		<div class="dialog_main_con all_center">
			<div class="dialog_head">
				<h2>登录</h2>
				<a href="javascript:void(0)" class="dialog_link close" @click="this.showLogin = false">&times;</a>
			</div>
			<div class="dialog_main">
				<div class="user">
					<div class="item">
						<label for="user_name">用户名：</label>
						<input id="user_name" type="text" placeholder="请输入用户名" v-bind:class="{'erro_input':erro.target == 'user_name'}" v-model="user_name" @blur="bl" @focus="fo"></input>					
					</div>
					<div class="item">
						<label for="password">密码：</label>
						<input id="password" type="password" placeholder="请输入密码" v-bind:class="{'erro_input':erro.target == 'password'}" v-model="password" @blur="bl" @focus="fo"></input>	
					</div>
					<div class="item clearfix">
						<input type="checkbox" value="记住账号" v-model="remember"><span>记住账号</span></input>
						<input type="checkbox" value="一周内免登录" v-model="noneedPassword"><span>一周内免登录</span></input>
						<a @click="funshowSignup()">注册</a>
					</div>
					<span class="erro_text" v-show="erro.iserro">{{erro.text}}</span>
				</div>
				<a href="javascript:void(0)" class="btn user_btn" @click="login">登录</a>
			</div>
			<div class="dialog_bottom">
				<span class="advance_browser">为了获得更好的体验，建议使用<a target="_balck" href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html"> 谷歌浏览器(Chrome)</a></span>
			</div>
		</div>
	</div>
</template>

<script>
	
var Vue = require('Vue');
var $ = require('jQuery');
var utils = require('utils');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var Login = Vue.extend({
	name:'Login',
	data: function(){
		return {
			user_name:'',
			password:'',
			noneedPassword: true,
			remember: true,
			erro:{
				iserro:false,
				text:'',
				target:''
			}
		}
	},
	props: ['showLogin','showSignup'],
	created:function(){
		if(localStorage.remember == 'true' && localStorage.userInfo){
			var userInfo = JSON.parse(localStorage.userInfo);
			this.user_name = userInfo.user_name;
			this.password = userInfo.password;
		}
	},
	methods:{
		funshowSignup:function(){
			this.showLogin = false;
			this.showSignup = true;
		},
		bl: function(){
			this.erro.iserro = false;
			this.erro.target = '';
		},
		fo: function(){
			this.erro.iserro = false;
			this.erro.target = '';
		},
		login: function(){
			var _this = this;
			this.erro = {
				iserro:false,
				text:'',
				target:''
			};
			var user_name = this.user_name;
			var password = this.password;
			var remember = this.remember;
			var noneedPassword = this.noneedPassword;
			if(user_name === ''){
				this.erro.iserro = true;
				this.erro.text = '用户名不能为空！';
				this.erro.target = 'user_name';
				return;
			}
			if(password === ''){
				this.erro.iserro = true;
				this.erro.text = '密码不能为空！';
				this.erro.target = 'password';
				return;
			}
			$.ajax({
				url:'/api/user/login',
				type:'get',
				data:{
					user_name:user_name,
					password:password,
					time:new Date().getTime(),
					remember:remember,
					noneedPassword:noneedPassword
				},
				success:function(data){
					if(data.iserro){
						_this.erro.iserro = true;
						_this.erro.text = data.msg;
						_this.erro.target = data.data.target;
						return;
					}
					localStorage.userInfo = JSON.stringify(data.data);
					if(_this.remember){
						localStorage.remember = _this.remember;
					}else{
						localStorage.remember = false;
					}
					router.go('/list');
				}
			})
		}
	}
})

Vue.component('m-login', Login);

module.exports = Login;

</script>
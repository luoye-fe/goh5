<template>
	<div class="dialog_con" v-show="showSignup" transition="fade">
		<div class="dialog_bg" @click="this.showSignup = false"></div>
		<div class="dialog_main_con all_center">
			<div class="dialog_head">
				<h2>注册</h2>
				<a href="javascript:void(0)" class="dialog_link close" @click="this.showSignup = false">&times;</a>
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
					<div class="item">
						<label for="password">确认密码：</label>
						<input id="password" type="password" placeholder="请再次输入密码" v-bind:class="{'erro_input':erro.target == 'passwordAgain'}" v-model="passwordAgain" @blur="bl" @focus="fo"></input>	
					</div>
					<div class="item clearfix">
						<a @click="funshowLogin()">已有帐号？</a>
					</div>
					<span class="erro_text" v-show="erro.iserro">{{erro.text}}</span>
				</div>
				<a href="javascript:void(0)" class="btn user_btn" @click="signup">注册</a>
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

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var loginSucc = function(Vm,userInfo){
	localStorage.userInfo = JSON.stringify(userInfo);
	Vm.user_name = '';
	Vm.password = '';
	Vm.passwordAgain = '';
	Vm.funshowLogin();
}

var Singup = Vue.extend({
	name:'Login',
	data: function(){
		return {
			user_name:'',
			password:'',
			passwordAgain:'',
			erro:{
				iserro:false,
				text:'',
				target:''
			}
		}
	},
	props: ['showLogin','showSignup'],
	methods:{
		funshowLogin:function(){
			this.showSignup = false;
			this.showLogin = true;
		},
		bl: function(){
			this.erro.iserro = false;
			this.erro.target = '';
		},
		fo: function(){
			this.erro.iserro = false;
			this.erro.target = '';
		},
		signup: function(){
			var _this = this;
			this.erro = {
				iserro:false,
				text:'',
				target:''
			};
			var user_name = this.user_name;
			var password = this.password;
			var passwordAgain = this.passwordAgain;
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
			if(password !== passwordAgain){
				this.erro.iserro = true;
				this.erro.text = '两次密码不一致！';
				this.erro.target = 'passwordAgain';
				return;
			}
			$.ajax({
				url:'/api/user/signup',
				type:'get',
				data:{
					user_name:user_name,
					password:password,
					time:new Date().getTime(),
				},
				success:function(data){
					if(data.iserro){
						_this.erro.iserro = true;
						_this.erro.text = data.msg;
						_this.erro.target = data.data.target;
						return;
					}
					loginSucc(_this,data.data);
				}
			})
		}
	}
})

Vue.component('m-signup', Singup);

module.exports = Singup;
</script>
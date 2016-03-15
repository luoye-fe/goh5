<template>
	<div class="head_con">
		<div class="item left">Go H5</div>
		<div class="item center" v-show="page == 'edit'">
			<ul class="create_group">
				<li><div class="icon icon1"></div><span>文本</span></li>
				<li><div class="icon icon2"></div><span>图片</span></li>
				<li><div class="icon icon3"></div><span>背景</span></li>
				<li><div class="icon icon4"></div><span>图集</span></li>
				<li><div class="icon icon5"></div><span>视频</span></li>
				<li><div class="icon icon6"></div><span>音乐</span></li>
			</ul>
		</div>
		<div class="item right">
			<ul class="btn_group">
				<li v-show="page == 'edit'">保存</li>
				<li v-show="page == 'edit'">记录</li>
				<li v-show="page == 'edit'">预览</li>
				<li v-show="page == 'edit'">设置</li>
				<li @click="logout" style="background: #ff5151;">退出</li>
			</ul>
		</div>
	</div>
</template>

<style>
.head_con{width: 100%;height: 60px;background: #31364a;display: flex;display: -webkit-flex;justify-content: space-between;position: relative;}
.head_con .item{color: #fff;line-height: 60px;font-size: 12px;}
.head_con .item>ul>li{display: inline-block;vertical-align: top;}
.head_con .item.left{margin-left: 20px;font-size: 22px;}
.head_con .item.center{position: absolute;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);}
.head_con .item.center .create_group{font-size: 0;}
.head_con .item.center .create_group li{font-size: 12px;cursor: pointer;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;width: 50px;padding: 0 5px;display: inline-block;vertical-align: middle;}
.head_con .item.center .create_group li:hover{background: #484d64;}
.head_con .item.center .create_group li span{display: block;text-align: center;line-height: 22px;}
.head_con .item.center .create_group li .icon{background-image: url('/dist/img/icon.png');width: 30px;height: 30px;margin: 0 auto;}
.head_con .item.center .create_group li .icon1{background-position: 0 0;}
.head_con .item.center .create_group li .icon2{background-position: 0 -30px;}
.head_con .item.center .create_group li .icon3{background-position: 0 -150px;}
.head_con .item.center .create_group li .icon4{background-position: 0 -60px;}
.head_con .item.center .create_group li .icon5{background-position: 0 -90px;}
.head_con .item.center .create_group li .icon6{background-position: 0 -120px;}
.head_con .item.right{}
.btn_group{margin-right: 17px}
.btn_group li{background: #76838e;height: 28px;line-height: 28px;margin: 16px 3px 0;padding: 0 10px;border-radius: 6px;cursor: pointer;transition: all ease 0.3s;-webkit-transition: all ease 0.3s;}
.btn_group li:hover{background: #01d7b2!important;}
</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var Head = Vue.extend({
	name:'Head',
	data: function(){
		return {
			page : this.$route.path.split('/')[1],
		}
	},
	created: function(){

	},
	methods:{
		logout: function(){
			$.ajax({
				url: '/api/user/logout',
				type: 'get',
				success: function(){
					router.go('/');
				}
			})
		}
	}
})

Vue.component('m-head', Head);

module.exports = Head;
	
</script>
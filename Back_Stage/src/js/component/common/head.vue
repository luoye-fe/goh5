<template>
	<div class="head_con">
		<div class="item left">Go H5</div>
		<div class="item center" v-show="page == 'edit'">
			<ul class="create_group">
				<li>文本</li>
				<li>图片</li>
				<li>图集</li>
				<li>背景</li>
				<li>视频</li>
				<li>音乐</li>
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
	.head_con{width: 100%;height: 50px;background: #3f4a58;display: flex;display: -webkit-flex;justify-content: space-between;}
	.head_con .item{color: #fff;line-height: 50px;font-size: 12px;}
	.head_con .item>ul>li{display: inline-block;vertical-align: top;}
	.head_con .item.left{margin-left: 20px;font-size: 22px;}
	.head_con .item.center{}
	.head_con .item.right{}
	.btn_group{margin-right: 17px}
	.btn_group li{background: #76838e;height: 28px;line-height: 28px;margin: 11px 3px 0;padding: 0 10px;border-radius: 6px;cursor: pointer;transition: all ease 0.3s;-webkit-transition: all ease 0.3s;}
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
				type: 'post',
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
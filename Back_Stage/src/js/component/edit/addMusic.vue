<template>
	<div class="dialog_con" v-show="showAddMusic" transition="fade">
		<div class="dialog_bg" @click="this.showAddMusic = false"></div>
		<div class="dialog_main_con small all_center">
			<div class="dialog_head">
				<h2>添加背景音乐</h2>
				<a href="javascript:void(0)" class="dialog_link close" @click="this.showAddMusic = false">&times;</a>
			</div>
			<div class="dialog_main">
				<div class="create_con all_center">
					<input type="text" placeholder="请输入音乐链接" v-model="bgMusic"></input>
					<a href="javascript:void(0)">
						<span>本地上传</span>
						<input type="file" accept="audio/*" @change="uploadMusic($event)"></input>
					</a>
					<div class="tips">大小不得超过4M（为了更好的体验，请控制音乐大小）</div>
				</div>
			</div>
			<div class="dialog_bottom">
				<ul class="dialog_btn">
					<li @click="this.showAddMusic = false">取消</li>
					<li @click="submit()">添加</li>
				</ul>
			</div>
		</div>
	</div>
</template>


<style>
.create_con{}
.create_con>input{width: 330px;height: 36px;font-size: 12px;padding: 0 10px;line-height: 36px;display: block;border-radius: 6px;outline: 0;border: 1px solid #ddd;}
.create_con>a{background: rgba(8,161,239,1);display: block;font-size: 12px;color: #fff;padding: 10px 0;width: 120px;text-align: center;margin-top: 15px;border-radius: 6px;position: relative;cursor: pointer;}
.create_con>a input{display: block;position: absolute;width: 100%;height: 100%;top: 0;left: 0;opacity: 0;z-index: 2;cursor: pointer;padding: 0;margin: 0;}
.create_con .tips{font-size: 12px;line-height: 28px;color: #76838f;display: block;font-style: normal;margin: 0 auto;}
.create_con a:hover{background: rgba(8,161,239,0.7);}
</style>


<script>
	
var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var AddMusic = Vue.extend({
	name: 'AddMusic',
	data: function(){
		return {
			bgMusic: '',
		}
	},
	props: ['showAddMusic'],
	created: function(){
		console.log(this.showAddMusic);
	},
	methods: {
		submit: function(){
			
		}
	}
})


module.exports = AddMusic;

</script>
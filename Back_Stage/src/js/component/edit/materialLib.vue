<template>
	<div class="dialog_con" v-show="materialLibObj.show" transition="fade">
		<div class="dialog_bg" @click="hideMaterialLib()"></div>
		<div class="dialog_main_con all_center">
			<div class="dialog_head">
				<h2>素材库</h2>
				<p>{{materialLibObj.msg}}</p>
				<a href="javascript:void(0)" class="dialog_link close" @click="hideMaterialLib()">&times;</a>
			</div>
			<div class="dialog_main lib_con">
				<div class="lib_list">
					<ul class="group">
						<li>我的图库</li>
					</ul>
					<div class="upload_btn">上传图片</div>
				</div>
				<div class="lib_main">
					<div class="lib_main_head">
						<ul class="lib_main_head_group">
							<li><span>管理</span></li>
						</ul>
						<ul class="lib_main_head_group" style="display: none;">
							<li><span>删除</span></li>
							<li><span>退出管理</span></li>
						</ul>
					</div>
					<div class="lib_main_body">
						<ul class="pics_con">
							<li>
								<img src="">
							</li>
						</ul>
						<div class="fenye"></div>
					</div>
				</div>
			</div>
			<div class="dialog_bottom">
				<ul class="dialog_btn">
					<li @click="hideMaterialLib()">取消</li>
					<li @click="ok()">确认</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style>
.lib_con{display: flex;flex-direction: row;}
.lib_con .lib_list{width: 200px;display: flex;flex-direction: column;}
.lib_con .lib_list .group{flex: 1;margin-top: 15px;}
.lib_con .lib_list .group li{border-bottom: 1px solid #ccd5db;background: #fff;width: 100%;padding: 0 0 0 20px;box-sizing: border-box;color: #76838f;font-size: 12px;height: 44px;line-height: 44px;cursor: pointer;}
.lib_con .lib_list .upload_btn{width: 100%;height: 44px;line-height: 44px;font-size: 16px;color: #fff;text-align: center;background: #01d7b2;}
.lib_con .lib_main{flex: 1;background: #fff;margin-top: 15px;border-top-left-radius: 6px;padding: 0 15px;}
.lib_con .lib_main .lib_main_head{width: 100%;height: 44px;border-bottom: 1px solid #ccd5db;display: flex;justify-content: flex-end;}
.lib_con .lib_main .lib_main_head .lib_main_head_group{font-size: 0;height: 44px;}
.lib_con .lib_main .lib_main_head .lib_main_head_group li{display: inline-block;vertical-align: middle;font-size: 12px;line-height: 44px;margin: 0 5px;padding: 0 10px;}
.lib_con .lib_main .lib_main_head .lib_main_head_group li span{cursor: pointer;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.lib_con .lib_main .lib_main_head .lib_main_head_group li span:hover{color: #01d7b2;}
.lib_con .lib_main .lib_main_body{}
.lib_con .lib_main .lib_main_body .pics_con{font-size: 0;}
.lib_con .lib_main .lib_main_body .pics_con li{display: inline-table;vertical-align: top;width: 31%;margin: 10px 1% 0;position: relative;overflow: hidden;padding-bottom: 31%;background: #ddd;}
.lib_con .lib_main .lib_main_body .pics_con li img{display: block;position: absolute;top: 50%;left: 50%;width: 100%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);}

</style>

<script>
	
var Vue = require('Vue');
var $ = require('jQuery');
var utils = require('utils');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var Pagination = require('../common/pagination.vue');

var MaterialLib = Vue.extend({
	name:'MaterianlLib',
	data: function(){
		return {
			
		}
	},
	components:{
		'm-pagination': Pagination
	},
	vuex: {
	  	getters: {
	  		materialLibObj: function(){
	  			return store.state.materialLibObj
	  		}
	  	},
	  	actions: actions
	},
	methods:{
		hideMaterialLib: actions.hideMaterialLib
	}
})


module.exports = MaterialLib;

</script>
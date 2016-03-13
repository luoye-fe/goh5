<template>
	<m-head></m-head>
	<div class="list_con">
		<div class="list_head">
			<ul>
				<li class="active">我的作品</li>
				<li>全部作品</li>
			</ul>
			<div class="search"><input type="text" placeholder="输入ID/标题进行查询"></input></div>
		</div>
		<div class="list_body">
			<ul>
				<li class="create" @click="showCreate = !showCreate">
					<div class="all_center">
						<div class="heng"></div>
						<div class="shu"></div>
						<span>创建新作品</span>
					</div>
				</li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>

	<m-loading v-show="loading"></m-loading>
	<m-alert :alert-obj.sync="alertObj"></m-alert>
	<m-create :show-create.sync="showCreate"></m-create>
</template>

<style>
.list_con{width: 960px;margin: 50px auto 0;}
.list_con .list_head{width: 100%;height: 44px;position: relative;font-size: 0;background: #fff;}
.list_con .list_head ul{display: inline-block;vertical-align: top;font-size: 0;}
.list_con .list_head ul li{display: inline-block;vertical-align: top;line-height: 44px;width: 150px;text-align: center;cursor: pointer;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;font-size: 16px;}
.list_con .list_head ul li.active{background: #01d7b2;color: #fff;}
.list_con .list_head ul li:hover{background: #01d7b2;color: #fff;}
.list_con .list_head .search{display: inline-block;position: absolute;right: 20px;}
.list_con .list_body{width: 100%;margin-top: 20px;}
.list_con .list_body ul{font-size: 0;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;}
.list_con .list_body ul li{width: 220px;background: #fff;margin: 10px;height: 250px;position: relative;font-size: 16px;}
.list_con .list_body ul li.create{cursor: pointer;}
.list_con .list_body ul li.create .shu{width: 6px;height: 100px;background: #01d7b2;margin: 0 auto 10px;}
.list_con .list_body ul li.create .heng{width: 100px;height: 6px;background: #01d7b2;margin: 0 auto 10px;position: absolute;top: 47px;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);}
.list_con .list_body ul li.create span{font-size: 14px;color: #01d7b2;}
</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var Head = require('../common/head.vue');
// var Pagination = require('../common/pagination.vue');
var Loading = require('../common/loading.vue');
var Alert = require('../common/alert.vue');
var Create = require('./create.vue');

var List = Vue.extend({
	data: function(){
		return {
			loading: true,
			showCreate: false,
			alertObj:{
				show: false,
				msg: '提示信息'
			},
			worksDat: '',
			listType: 0, // 0:默认 1:自己
			paginationConf: {
				currentPage: 1,
				// totalItems: 30,
				itemsPerPage: 7,
				pagesLength: 5,
				onChange: function(){

				},
				setTotalItems: function(cb){
					this.totalItems = 50;
				}
			}
		}
	},
	created: function(){
		var _this = this;
		this.loadList(this.listType,function(data){
			console.log(data);
			_this.loading = false;
		});
	},
	components: {
		// 'm-pagination': Pagination,
		// <m-pagination :pagination-conf.sync="paginationConf"></m-pagination>
	},
	methods: {
		logout: function(){
			$.ajax({
				url: '/api/user/logout',
				type: 'post',
				success: function(){
					router.go('/');
				}
			})
		},
		loadList: function(type, cb){
			$.ajax({
				url: '/api/list',
				type: 'get',
				success: function(data){
					cb & cb(data);
					// List.data().loading = false;
					// console.log(loading);
				}
			})
		},
		ceshi: function(){
			this.$emit('showAlert',{show: true,msg: 'loye'});
		},
	},
	events: {
		showAlert: function(obj){
			this.alertObj.show = obj.show;
			this.alertObj.msg = obj.msg;
		}
	}
})

module.exports = List;

</script>

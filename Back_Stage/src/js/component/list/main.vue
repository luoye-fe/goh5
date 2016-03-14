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
				<li v-for="item in listData" track-by="$index">
					<div class="top">
						<div class="qrcode"></div>
						<img :src="item.about.thumbnail">
					</div>
					<div class="middle">
						<p>{{item.title}}</p>
						<div class="desc">
							<em>{{item.user_name}}</em>
							<em>{{item.createTime | time}}</em>
						</div>
					</div>
					<div class="bottom">
						<a href="javascript:void(0)" v-link="{path:'/show/:item._id'}">编辑</a>
						<a href="javascript:void(0)">复制</a>
						<a href="javascript:void(0)">删除</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<m-pagination :pagination-conf="paginationConf"></m-pagination>
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
.list_con .list_body ul li{width: 220px;background: #fff;margin: 10px;position: relative;font-size: 16px;}
.list_con .list_body ul li.create{cursor: pointer;}
.list_con .list_body ul li.create .shu{width: 6px;height: 100px;background: #01d7b2;margin: 0 auto 10px;}
.list_con .list_body ul li.create .heng{width: 100px;height: 6px;background: #01d7b2;margin: 0 auto 10px;position: absolute;top: 47px;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);}
.list_con .list_body ul li.create span{font-size: 14px;color: #01d7b2;}
.list_con .list_body ul li .top{position: relative;}
.list_con .list_body ul li .top .qrcode{position: absolute;widows: 220px;height: 220px;left: 0;top: 0;}
.list_con .list_body ul li .top img{display: block;width: 220px;height: 220px;}
.list_con .list_body ul li .middle{padding: 8px;box-sizing: border-box;border-bottom: 1px solid #ddd;border-top: 1px solid #ddd;}
.list_con .list_body ul li .middle p{font-size: 16px;color: #3f4a58;line-height: 24px;text-align: left;}
.list_con .list_body ul li .middle .desc{font-size: 0;}
.list_con .list_body ul li .middle .desc em{font-size: 12px;color: #a0aec4;display: inline-block;vertical-align: top;width: 50%;font-style: normal;line-height: 20px;}
.list_con .list_body ul li .middle .desc em:first-child{text-align: left;}
.list_con .list_body ul li .middle .desc em:last-child{text-align: right;}
.list_con .list_body ul li .bottom{text-align: left;}
.list_con .list_body ul li .bottom a{display: inline-block;vertical-align: top;color: #01d7b2;font-size: 14px;line-height: 32px;margin: 0 8px;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.list_con .list_body ul li .bottom a:hover{text-decoration: underline;}


</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var filter = require('../../filter/index.js');

var Head = require('../common/head.vue');
var Pagination = require('../common/pagination.vue');
var Loading = require('../common/loading.vue');
var Alert = require('../common/alert.vue');
var Create = require('./create.vue');

var loadListData = function(params,cb){
	var type = params.type || 1;
	var page = params.page || 1;
	$.ajax({
		url: '/api/list?page=' + page + '&me=' + type,
		type: 'get',
		success: function(data){
			cb & cb(data);
		}
	})
}

var listVm = null;
var List = Vue.extend({
	name: 'List',
	data: function(){
		return {
			loading: true,
			showCreate: false,
			alertObj:{
				show: false,
				msg: '提示信息'
			},
			listData: '',
			listType: 0, // 0:默认 1:自己
			paginationConf: {
				currentPage: 1,
				totalItems: 0,
				itemsPerPage: 7,
				pagesLength: 5,
				onChange: function(){
					var _this = this;
					loadListData({type: this.listType,page: this.currentPage},function(data){
						_this.totalItems = data.data.totalItems;
						console.log(data);
						listVm.loading = false;
						listVm.listData = data.data.listData;
					});
				}
			}
		}
	},
	init: function(){
		listVm = this;
	},
	created: function(){

	},
	components: {
		'm-pagination': Pagination,
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

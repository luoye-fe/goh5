<template>
	<div class="edit_bg" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: #d0cfd8"></div>
	<m-head :main-code.sync="mainCode" :current-page.sync="currentPage" :current-page-data.sync="currentPageData"></m-head>	
	<m-pagelist :pages-data.sync="pagesData" :current-page.sync="currentPage"></m-pagelist>
	<m-phone :work-data.sync="workData" :current-page.sync="currentPage" :pages-data.sync="pagesData" :current-page-data.sync="currentPageData"></m-phone>
	<m-loading :show.sync="loading"></m-loading>
</template>

<style>
	

</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var Head = require('../common/head.vue');
var Loading = require('../common/loading.vue');
var PageList = require('./pageList.vue');
var Phone = require('./phone.vue');

var Edit = Vue.extend({
	name: 'Edit',
	data: function(){
		return {
			id: '',
			workData: '', // 顶级数据，其它的数据都是从此延伸，双向绑定
			loading: true,
			mainCode: '',
			pagesData: '', // 所有页面
			currentPage: 1,
			currentPageData: '', // 当前也元素数据
			currentItems: [] // 所选元素
		}
	},
	init: function(){

	},
	created: function(){
		this.id = this.$route.params.id;
		var _this = this;
		$.ajax({
			url: '/api/work/getWork',
			type: 'get',
			data: {
				_id: _this.id
			},
			success: function(data){
				_this.loading = false;
				_this.workData = data.data;
				_this.mainCode = _this.workData.mainCode;
				_this.pagesData = _this.workData.mainCode.pages;
				_this.currentPageData = _this.workData.mainCode.pages[_this.currentPage].items;
			}
		})
	},
	ready: function(){

	},
	components: {
		'm-pagelist': PageList,
		'm-phone': Phone
	},
	methods: {

	},
	events: {

	},
	watch: {
		'pagesData': function(){
			console.log('页面信息:');
			this.$log('pagesData');
		}
	}
})

module.exports = Edit;
	
</script>
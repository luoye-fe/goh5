<template>
	<div class="edit_bg" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: #d0cfd8"></div>
	<m-head :main-code.sync="mainCode"></m-head>	
	<m-pagelist :pages-data.sync="pagesData" :current-page.sync="currentPage"></m-pagelist>
	<m-phone :work-data.sync="workData"></m-phone>
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
			workData: '',
			loading: true,
			mainCode: '',
			pagesData: '',
			currentPage: 1,
			currentItems: [],
		}
	},
	init: function(){
		this.id = this.$route.params.id;
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
				_this.workData = data.data[0];
				_this.mainCode = _this.workData.mainCode;
				_this.pagesData = _this.workData.mainCode.pages;
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
			this.$log('pagesData');
		}
	}
})

module.exports = Edit;
	
</script>
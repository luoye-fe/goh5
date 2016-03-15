<template>
	<m-head></m-head>
	
	<m-pagelist :pages-data.sync="pagesData" :current-page="currentPage"></m-pagelist>

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

var Edit = Vue.extend({
	name: 'Edit',
	data: function(){
		return {
			id: '',
			worksData: '',
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
				_this.worksData = data.data[0];
				_this.mainCode = _this.worksData.mainCode;
				_this.pagesData = _this.worksData.mainCode.pages;
			}
		})
	},
	ready: function(){

	},
	components: {
		'm-pagelist': PageList
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
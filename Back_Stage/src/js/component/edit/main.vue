<template>
	<m-head></m-head>
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

var Edit = Vue.extend({
	name: 'Edit',
	data: function(){
		return {
			id: '',
			mainCode: '',
			loading: true,
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
				console.log(data);
			}
		})
	},
	ready: function(){

	},
	methods: {

	},
	events: {

	},
	watch: {

	}
})

module.exports = Edit;
	
</script>
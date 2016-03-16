<template>
	<div class="edit_bg" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: #d0cfd8"></div>
	<m-head></m-head>	
	<m-pagelist></m-pagelist>
	<m-phone></m-phone>
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

var store = require('../../store/index.js');
var actions = require('../../store/actions.js');

var Head = require('../common/head.vue');
var Loading = require('../common/loading.vue');
var PageList = require('./pageList.vue');
var Phone = require('./phone.vue');

var Edit = Vue.extend({
	name: 'Edit',
	store,
	data: function(){
		return {
			loading: true
		}
	},
	vuex: {
	  	getters: {
		    workData: function(){
				return store.state.workData;
			}
	  	},
	  	actions: actions
	},
	created: function(){
		var _this = this;
		this.initData(this.$route.params.id, function(){
			_this.loading = false;
		});
	},
	components: {
		'm-pagelist': PageList,
		'm-phone': Phone
	},
	methods: {
		initData: actions.initData
	},
	events: {

	},
	watch: {
		
	}
})

module.exports = Edit;
	
</script>
<template>
	<div class="edit_bg" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: #d0cfd8" @click="removeAllItems()"></div>
	<m-head></m-head>	
	<m-page-list></m-page-list>
	<m-phone></m-phone>
	<m-attr-list></m-attr-list>
	<m-loading :show.sync="loading"></m-loading>
	<m-alert></m-alert>
	<m-material-lib></m-material-lib>
</template>

<style>
	

</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var Head = require('../common/head.vue');
var Loading = require('../common/loading.vue');
var PageList = require('./pageList.vue');
var Phone = require('./phone.vue');
var AttrList = require('./attrList.vue');
var MaterialLib = require('./materialLib.vue')


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
		$(window).bind("beforeunload",function(){
			if(_this.$route.path.indexOf('edit') !== -1){
				return "请确认您的场景已保存"
			}
		})
	},
	components: {
		'm-page-list': PageList,
		'm-phone': Phone,
		'm-attr-list': AttrList,
		'm-material-lib': MaterialLib
	},
	methods: {
		initData: actions.initData,
		removeAllItems: actions.removeAllItems
	},
	events: {

	},
	watch: {
		
	}
})



module.exports = Edit;
	
</script>
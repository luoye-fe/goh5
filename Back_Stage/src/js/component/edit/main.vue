<template>
	<div class="edit_bg" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: #d0cfd8"></div>
	<m-head :show-set.sync="showSet"></m-head>	
	<m-page-list></m-page-list>
	<m-phone :bg-grid-status.sync="bgGridStatus"></m-phone>
	<m-tool-bar :bg-grid-status.sync="bgGridStatus"></m-tool-bar>
	<m-attr-list></m-attr-list>
	<m-loading :loading.sync="loading"></m-loading>
	<m-alert></m-alert>
	<m-material-lib-pic :loading.sync="loading"></m-material-lib-pic>
	<m-material-lib-music :loading.sync="loading"></m-material-lib-music>
	<m-set-page :show-set.sync="showSet"></m-set-page>
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
var MaterialLibPic = require('./materialLibPic.vue');
var MaterialLibMusic = require('./materialLibMusic.vue');
var ToolBar = require('./toolbar.vue');
var SetPage = require('./set.vue');

var Edit = Vue.extend({
	name: 'Edit',
	store,
	data: function(){
		return {
			loading: true,
			bgGridStatus: true,
			showSet: false,
			showAddMusic: false,
			autoSave: null
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
		this.initData(this.$route.params.id, function(data){
			if(data.iserro && data.msg === '没有权限'){
				actions.alert(store,{
					show:true,
					msg: data.msg,
					type: 'danger'
				})
			}else{
				_this.loading = false;
			}
		});
		$(window).bind("beforeunload",function(){
			if(_this.$route.path.indexOf('edit') !== -1){
				return "请确认您的场景已保存"
			}
		})
	},
	ready: function(){
		var _this = this;
		this.autoSave = setInterval(function(){
			localStorage[_this.$route.params.id] = _this.workData === '' ? null : JSON.stringify(_this.workData);
		}, 10000);
	},
	beforeDestroy: function(){
		clearInterval(this.autoSave);
	},
	components: {
		'm-page-list': PageList,
		'm-phone': Phone,
		'm-attr-list': AttrList,
		'm-material-lib-pic': MaterialLibPic,
		'm-material-lib-music': MaterialLibMusic,
		'm-tool-bar': ToolBar,
		'm-set-page': SetPage,
	},
	methods: {
		initData: actions.initData
	}
})

module.exports = Edit;
	
</script>
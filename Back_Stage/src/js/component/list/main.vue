<template>
	<m-head></m-head>

	<div class="list_con">
		<div class="list_head">
			<ul>
				<li>我的作品</li>
				<li>全部作品</li>
				<li>推荐作品</li>
			</ul>
		</div>
		<div class=""></div>
	</div>
	<m-loading v-show="loading"></m-loading>
</template>


<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var Head = require('../common/head.vue');
var Loading = require('../common/loading.vue');

Vue.component('m-head', Head);
Vue.component('m-loading', Loading);

var List = {
	name: 'List',
	data: function(){
		return {
			loading: true,
		}
	},
	created: function(){
		var _this = this;
		$.ajax({
			url: '/api/list?me=1',
			type: 'get',
			success: function(data){
				_this.$data.loading = false;
				console.log(data);
			}
		})
	},
	methods:{
		logout: function(){
			$.ajax({
				url: '/api/user/logout',
				type: 'post',
				success: function(){
					router.go('/');
				}
			})
		}
	}
}

module.exports = List;

</script>
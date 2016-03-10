<template>
	<h1>list</h1>
	<a href="javascript:void(0)" v-on:click="logout">注销</a>
</template>


<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();


module.exports = {
	name: 'List',
	data: function(){
		return {

		}
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

</script>
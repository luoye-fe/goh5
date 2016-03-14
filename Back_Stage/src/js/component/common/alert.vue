<template>
	<div class="tips_con" v-show="alertObj.show">
		<h1>{{alertObj.msg}}</h1>
	</div>
</template>

<style>
.tips_con{width: 200px;height: 100px;position: fixed;left: 50%;top: 80px;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);background: rgba(0,0,0,0.4);z-index: 9999;}
.tips_con h1{font-size: 24px;color: #fff;text-align: center;line-height: 100px;}
</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Alert = Vue.extend({
	data: function(){
		return {
			show: false,
			msg: '提示信息'
		}
	},
	props:['alertObj']
})

Vue.component('m-alert', Alert);

module.exports = Alert;

</script>
'use strict';

var $ = require('jQuery');
var Vue = require('Vue');

$.ajax({
	url:'http://127.0.0.1:3030/api/list',
	type:'get',
	success:function(res){
		console.log(res);
	}
})

var app = new Vue({
	el:'#app',
	data:{
		test:'111'
	}
})


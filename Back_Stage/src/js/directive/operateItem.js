'use strict';
var Vue = require('Vue');
var $ = require('jQuery');

window.$ = $;

Vue.directive('operateItem',function(){
	var _this = this;
	var target = this.el;
	
	$(target).bind('dblclick',function(){
		if($(target).attr('type') !== 'txt'){
			return;
		}
		// 文本编辑操作
	})

	


})
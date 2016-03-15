<template>
	<div class="pages_con">
		<div class="item pages_list">
			<div class="head">页面列表</div>
			<ul>
				<li v-for="item in pagesData" :class="{'active':currentPage == $index+1}" @click="selectPage($index)">第{{$index+1}}页</li>
			</ul>
		</div>
		<div class="item nav_bottom">
		    <a href="javascript:void(0)" title="添加新页" @click="addPage()"><img src="/dist/img/add_page.png"/><span>添加新页</span></a>
		</div>
	</div>
</template>

<style>

.pages_con{position: fixed;background: #fff;display: flex;flex-direction:column;width: 280px;box-sizing: border-box;height: 100%;padding-bottom: 60px;}
.pages_con .item{display: flex;flex-direction: column;}
.pages_con .head {height: 40px;line-height: 40px;text-align: center;color: #fff;background: #0fcebd;font-size: 16px;width: 100%;}
.pages_con .item.pages_list {flex: 1;}
.pages_con .item.pages_list ul{position: relative;width: 280px;padding: 0 20px;box-sizing: border-box;overflow-y: auto;flex:1;}
.pages_con .item.pages_list ul li{display: block;height: 36px;line-height: 36px;margin-top: 10px;color: #666;text-align: center;background: #dcdcdc;cursor: pointer;width: 100%;border-radius: 6px;font-weight: bold;}
.pages_con .item.pages_list ul li:last-child{margin-bottom: 10px;}
.pages_con .item.pages_list ul li.active {background: #0fcebd;color: #fff}
.pages_con .item.nav_bottom{width: 280px;text-align: center;height: 44px;background: #3f4a58;font-size: 16px;}
.pages_con .item.nav_bottom a{color: #10c3b3;display: block;cursor: pointer;line-height: 44px;}
.pages_con .item.nav_bottom a img{display: inline-block;vertical-align: middle;margin-right: 10px;width: 16px;height: 16px;}
.pages_con .item.nav_bottom a span{display: inline-block;vertical-align: middle;}

</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var PageList = Vue.extend({
	name: 'PgaeList',
	data: function(){
		return {

		}
	},
	created: function(){

	},
	props: ['pagesData','currentPage'],
	methods: {
		selectPage: function($index){
			this.currentPage = $index + 1;
		},
		addPage: function(){
			var model = {
            	main: {
                	background: '#fff',
            	    type: '',
        	        height: 504,
    	        },
	            items: []
        	}
        	this.pagesData.push(model);
        	this.selectPage(this.pagesData.length - 1);
		}
	}

})

module.exports = PageList;

</script>
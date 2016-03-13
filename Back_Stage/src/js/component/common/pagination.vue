<template>	
	<div class="page-list">
		<ul class="pagination" v-show="paginationConf.totalItems > 0">
			<li :class="{disabled: paginationConf.currentPage == 1}" @click="changeCurrentPage(1)"><span>首页</span></li>
			<li :class="{disabled: paginationConf.currentPage == 1}" @click="prevPage()"><span><</span></li>
			<li v-for="item in pageList" track-by="$index" :class="{active: item == paginationConf.currentPage}" @click="changeCurrentPage(item)"><span>{{item}}</span></li>
			<li :class="{disabled: paginationConf.currentPage == paginationConf.numberOfPages}" @click="nextPage()"><span>></span></li>
			<li :class="{disabled: paginationConf.currentPage == paginationConf.numberOfPages}" @click="changeCurrentPage(paginationConf.numberOfPages)"><span>末页</span></li>
		</ul>
	</div>
</template>

<style>
.page-list {font-size: 0;color: #333;text-align: center;margin-bottom: 20px;}
.page-list .pagination {font-size: 0;display: inline-block;vertical-align: middle;*display: inline;*zoom: 1;}
.page-list .pagination li {display: inline-block;vertical-align: middle;font-size: 14px;text-align: center;border: 1px solid #ddd;margin: 0 5px;cursor: pointer;background: #fff;transition: all ease 0.3s;-webkit-transition: all ease 0.3s;-o-transition: all ease 0.3s;-moz-transition: all ease 0.3s;}
.page-list .pagination li:hover {background: #01d7b2;color: #fff;border: 1px solid #01d7b2;}
.page-list .pagination li:active {background: #006b59;color: #fff;border: 1px solid #006b59;}
.page-list .pagination .active {border: 1px solid #01d7b2;background: #01d7b2;color: #fff;}
.page-list .pagination .disabled {color: #aaa;cursor: not-allowed;}
.page-list .pagination .disabled:hover {border: 1px solid #ddd;background: #fff;color: #aaa;}
.page-list .pagination span {display: block;padding: 5px 10px;}
.page-list .page-total {display: inline-block;vertical-align: middle;*display: inline;*zoom: 1;font-size: 14px;}
.page-list .page-total input {height: 24px;border: 1px solid #ddd;width: 32px;text-align: center;margin-right: 5px;}
.page-list .page-total span {cursor: pointer;padding: 5px 10px;transition: all ease 0.3s;-webkit-transition: all ease 0.3s;-o-transition: all ease 0.3s;-moz-transition: all ease 0.3s;}
.page-list .page-total span:hover {color: #01d7b2;}
.page-list .page-total strong {font-size: 14px;font-weight: bold;}
</style>

<script>

/*
vm.$data.paginationConf = {
	currentPage: 1,     // 当前页
	totalItems: 30,     // 总条数
	itemsPerPage: 4,    // 每页条数
	pagesLength: 5,     // 显示几页( 1,2,3 / 1,2,3,4,5)
	onChange: function() {
		// 回调
	},
	setTotalItems: function(){
		// 如果总条数是异步返回的，不要在初始配置中设置 totalItems ，在这获取数据后执行 this.totalItems = .. 
	}
};
*/

var Vue = require('Vue');
var $ = require('jQuery');

var Pagination = Vue.extend({
	name: 'Pagination',
	data: function(){
		return {
			pageList: []
		}
	}
})

module.exports = Pagination;
</script>
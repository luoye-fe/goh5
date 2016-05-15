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
.page-list {font-size: 0;color: #333;text-align: center;margin-bottom: 20px;margin-top: 10px;}
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
	},
	created: function(){
		var _this = this;
		this.paginationConf.pagesLength = parseInt(this.paginationConf.pagesLength) ? parseInt(this.paginationConf.pagesLength) : 9;
		if (this.paginationConf.pagesLength % 2 === 0) {
		    this.paginationConf.pagesLength = this.paginationConf.pagesLength - 1;
		}
		if (!this.paginationConf.perPageOptions) {
		    this.paginationConf.perPageOptions = [10, 15, 20, 30, 50];
		}
		if(this.paginationConf.totalItems){
			this.getPagination();
		}
	},
	props:['paginationConf'],
	methods: {
		changeCurrentPage: function(item) {
		    this.paginationConf.currentPage = item;
		},
		prevPage: function() {
		    if (this.paginationConf.currentPage > 1) {
		        this.paginationConf.currentPage -= 1;
		    }
		},
		nextPage: function() {
		    if (this.paginationConf.currentPage < this.paginationConf.numberOfPages) {
		        this.paginationConf.currentPage += 1;
		    }
		},
		getPagination: function(newValue, oldValue) {
			var _this = this;
		    _this.paginationConf.currentPage = parseInt(_this.paginationConf.currentPage) ? parseInt(_this.paginationConf.currentPage) : 1;
		    _this.paginationConf.totalItems = parseInt(_this.paginationConf.totalItems) ? parseInt(_this.paginationConf.totalItems) : 0;
		    _this.paginationConf.itemsPerPage = parseInt(_this.paginationConf.itemsPerPage) ? parseInt(_this.paginationConf.itemsPerPage) : 8;
		    _this.paginationConf.numberOfPages = Math.ceil(_this.paginationConf.totalItems / _this.paginationConf.itemsPerPage);
		    if (_this.paginationConf.currentPage < 1) {
		        _this.paginationConf.currentPage = 1;
		    }
		    if (_this.paginationConf.numberOfPages > 0 && _this.paginationConf.currentPage > _this.paginationConf.numberOfPages) {
		        _this.paginationConf.currentPage = _this.paginationConf.numberOfPages;
		    }
		    _this.pageList = [];
		    if (_this.paginationConf.numberOfPages <= _this.paginationConf.pagesLength) {
		        for (var i = 1; i <= _this.paginationConf.numberOfPages; i++) {
		            _this.pageList.push(i);
		        }
		    } else {
		        var offset = (_this.paginationConf.pagesLength + 1) / 2;
		        if (_this.paginationConf.currentPage <= offset) {
		            for (var i = 1; i <= _this.paginationConf.pagesLength; i++) {
		                _this.pageList.push(i);
		            }
		        } else if (_this.paginationConf.currentPage > _this.paginationConf.numberOfPages - offset) {
		            for (var i = _this.paginationConf.pagesLength - 1; i > 0; i--) {
		                _this.pageList.push(_this.paginationConf.numberOfPages - i);
		            }
		            _this.pageList.push(_this.paginationConf.numberOfPages)
		        } else {
		            for (var i = Math.ceil(_this.paginationConf.pagesLength / 2); i > 1; i--) {
		                _this.pageList.push(_this.paginationConf.currentPage - i + 1);
		            }
		            _this.pageList.push(_this.paginationConf.currentPage);
		            for (var i = 1; i < Math.ceil(_this.paginationConf.pagesLength / 2); i++) {
		                _this.pageList.push(_this.paginationConf.currentPage + i);
		            }
		        }
		    }
		}
	},
	watch: {
		'paginationConf': {
			handler: function(val){
				this.getPagination();
			},
			deep: true
		},
		'paginationConf.currentPage': {
			handler: function(val){
				this.paginationConf.onChange();
			}
		}
	}
})

module.exports = Pagination;
</script>
<template>
	<div class="side_con right" v-show="checkedItems.length == 1">
		<div class="item attrList">
			<div class="head">元素属性</div>
		</div>
	</div>
</template>

<style>



</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var AttrList = Vue.extend({
	name: 'AttrList',
	data: function(){
		return {

		}
	},
	vuex: {
	  	getters: {
	  		checkedItems: function(){
				return store.state.checkedItems;
			}
	  	},
	  	actions: actions
	},
	created: function(){
		console.log(this.checkedItems.length);
	},
	methods: {
		selectPage: actions.selectPage,
		addPage: actions.addPage
	}

})

module.exports = AttrList;

</script>
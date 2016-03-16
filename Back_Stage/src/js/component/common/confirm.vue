<template>
	<div class="dialog_con" v-show="confirmObj.show" transition="fade">
		<div class="dialog_bg" @click="hideConfirm()"></div>
		<div class="dialog_main_con confirm">
			<div class="dialog_head">
				<h2>提示</h2>
				<a href="javascript:void(0)" class="dialog_link close" @click="this.showCreate = false">&times;</a>
			</div>
			<div class="dialog_main">
				<h4 class="all_center">{{confirmObj.msg}}</h4>
			</div>
			<div class="dialog_bottom">
				<ul class="dialog_btn">
					<li @click="hideConfirm()">取消</li>
					<li @click="ok()">确认</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<style>
.confirm{position: absolute;left: 50%;transform: translateX(-50%);top: 100px;}
.dialog_main_con.confirm{width: 480px!important;height: 190px!important;}
.dialog_main_con.confirm h4{display: block;font-size: 24px;color: #76838f}

</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var Confirm = Vue.extend({
	name: 'Confirm',
	vuex: {
	  	getters: {
	  		confirmObj: function(){
				return store.state.confirmObj;
			}
	  	},
	  	actions: actions
	},
	methods: {
		ok: function(){
			this.confirmObj.event();
			this.hideConfirm();
		},
		hideConfirm: actions.hideConfirm
	}
})

Vue.component('m-confirm', Confirm);

module.exports = Confirm;

</script>
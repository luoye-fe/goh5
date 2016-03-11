<template>
	<div class="dialog_con" v-show="showCreate" transition="fade">
		<div class="dialog_bg" @click="this.showCreate = false"></div>
		<div class="dialog_main_con all_center">
			<div class="dialog_head">
				<h2>创建新作品</h2>
				<a href="javascript:void(0)" class="dialog_link" @click="this.showCreate = false">关闭</a>
			</div>
			<div class="dialog_main">
				
			</div>
			<div class="dialog_bottom">
				<ul class="dialog_btn">
					<li @click="this.showCreate = false">取消</li>
					<li>确认</li>
				</ul>
			</div>
		</div>
	</div>
</template>


<style>
	

</style>


<script>
	
var Vue = require('Vue');
var $ = require('jQuery');

var Create = {
	data: function(){
		return {
			title: '',
		}
	},
	props: ['showCreate']
}

module.exports = Create;

</script>
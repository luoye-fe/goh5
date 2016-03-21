<template>
	<div class="set_page" v-show="showSet" transition="fade">
		<div class="set_bg" v-show="showSet" @click="showSet=false"></div>
		<div class="set_con" v-show="showSet" transition="fromRight">
			<div class="left">
				<div class="item">
					<h4>分享图</h4>
					<div class="thumbnail">
						<img :src="about.thumbnail">
						<span>点击上传</span>
					</div>
					<span>请上传300*300以上正方形图片</span>
				</div>
				<div class="item">
					<h4>预览</h4>
					<a class="qrcode" :href="'http://'+ host + '/show/' + this.$route.params.id" target="_blank"></a>
					<a :href="'http://'+ host + '/show/' + this.$route.params.id" target="_blank">{{'http://'+ host + '/show/' + this.$route.params.id}}</a>
				</div>
			</div>
			<div class="right">
				
			</div>
		</div>	
	</div>
</template>

<style>
.set_page{position: fixed;left: 0;top: 60px;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6);padding-bottom: 60px;z-index: 99999;}
.set_bg{position: absolute;width: 100%;height: 100%;top: 0;left: 0;}
.set_con{position: absolute;right: 0;background-color: #fff;width: 700px;height: 100%;top: 0;display: flex;flex-direction: row;}
.set_con .left{width: 300px;}
.set_con .right{flex: 1;}
</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');


var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');


var SetPage = Vue.extend({
	name: 'Set',
	data: function(){
		return {
			host: location.host
		}
	},
	props: ['showSet'],
	vuex: {
        getters: {
        	workData: function(){
        		return store.state.workData;
        	},
        	about: function(){
        		return store.state.about;
        	},
        	setConfig: function(){
        		return store.state.setConfig;
        	}
        },
        actions: actions
    },
    ready: function(){
    	var _this = this;
    	$('.qrcode').qrcode({
    		width: 160,
    		height: 160,
    		text: 'http://'+ this.host + '/show/' + _this.$route.params.id,
    		render: 'canvas'
    	});
    }
})

module.exports = SetPage;

</script>
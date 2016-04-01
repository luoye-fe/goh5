<template>
	<div class="head_con">
		<a href="javascript:void(0)" v-link="{path: '/list'}" class="item left">Go H5</a>
		<div class="item center" v-show="page == 'edit'">
			<ul class="create_group">
				<li @click="addText()"><div class="icon icon1"></div><span>文本</span></li>
				<li @click="materialLibPic({show:true,msg:'插入图片',type:'pic'})"><div class="icon icon2"></div><span>图片</span></li>
				<li @click="materialLibPic({show:true,msg:'更改背景',type:'bg'})"><div class="icon icon3"></div><span>背景</span></li>
				<!-- <li><div class="icon icon4"></div><span>图集</span></li> -->
				<!-- <li><div class="icon icon5"></div><span>视频</span></li> -->
				<li @click="materialLibMusic({show:true,msg:'设置背景音乐',type:'bgMusic'})"><div class="icon icon6"></div><span>音乐</span></li>
			</ul>
		</div>
		<div class="item right">
			<ul class="btn_group">
				<li v-show="page == 'edit'" @click="save()">保存</li>
				<!-- <li v-show="page == 'edit'">记录</li> -->
				<li v-show="page == 'edit'" @click.stop="preview($event)">
					预览
					<div class="qrcode hide">
						<div class="triangle"></div>
						<a v-qrcode="'http://'+ host + '/show/' + this.$route.params.id" :href="'http://'+ host + '/show/' + this.$route.params.id" target="_blank"></a>
						<div class="tips">点击或扫描二维码预览</div>
					</div>
				</li>
				<li v-show="page == 'edit'" @click="showSet = !showSet">设置</li>
				<li @click="logout()" style="background: #ff5151;">退出</li>
			</ul>
		</div>
	</div>
</template>

<style>
.head_con{width: 100%;height: 60px;background: #31364a;display: flex;display: -webkit-flex;justify-content: space-between;position: fixed;top: 0;z-index: 99;}
.head_con .item{color: #fff;line-height: 60px;font-size: 12px;}
.head_con .item>ul>li{display: inline-block;vertical-align: top;}
.head_con .item.left{margin-left: 20px;font-size: 22px;}
.head_con .item.center{position: absolute;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);}
.head_con .item.center .create_group{font-size: 0;}
.head_con .item.center .create_group li{font-size: 12px;cursor: pointer;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;width: 50px;padding: 0 5px;display: inline-block;vertical-align: middle;}
.head_con .item.center .create_group li:hover{background: #484d64;}
.head_con .item.center .create_group li span{display: block;text-align: center;line-height: 22px;}
.head_con .item.center .create_group li .icon{background-image: url('/back/dist/img/icon.png');width: 30px;height: 30px;margin: 0 auto;}
.head_con .item.center .create_group li .icon1{background-position: 0 0;}
.head_con .item.center .create_group li .icon2{background-position: 0 -30px;}
.head_con .item.center .create_group li .icon3{background-position: 0 -150px;}
.head_con .item.center .create_group li .icon4{background-position: 0 -60px;}
.head_con .item.center .create_group li .icon5{background-position: 0 -90px;}
.head_con .item.center .create_group li .icon6{background-position: 0 -120px;}
.head_con .item.right{}
.btn_group{margin-right: 17px}
.btn_group li{background: #76838e;height: 28px;line-height: 28px;margin: 16px 3px 0;padding: 0 10px;border-radius: 6px;cursor: pointer;transition: all ease 0.3s;-webkit-transition: all ease 0.3s;position: relative;}
.btn_group li:hover{background: #01d7b2!important;}
.btn_group li .qrcode{display: block;position: absolute;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);background: #fff;padding: 10px;top: 45px;display: none;border-radius: 6px;}
.btn_group li .qrcode .triangle{position: absolute;width: 0;height: 0;border-bottom: 10px solid #fff;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid transparent;top: -20px;left: 50%;margin-left: -10px;}
.btn_group li .qrcode a{display: block;width: 198px;height: 198px;}
.btn_group li .qrcode .tips{color: #76838e;text-align: center;font-size: 12px;line-height: 12px;margin-top: 5px;}
</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var tpl = require('../../template/tpl.js');
var utils = require('utils');

var Head = Vue.extend({
	name:'Head',
	data: function(){
		return {
			page : this.$route.path.split('/')[1],
			host: location.host
		}
	},
	props: ['showSet'],
	vuex: {
        getters: {
            workData: function(){
				return store.state.workData;
			},
			mainCode: function(){
				return store.state.mainCode;
			}
        },
        actions: actions
    },
	methods:{
		addText: actions.addText,
		materialLibPic: actions.materialLibPic,
		materialLibMusic: actions.materialLibMusic,
		logout: function(){
			$.ajax({
				url: '/api/user/logout',
				type: 'get',
				success: function(){
					router.go('/');
				}
			})
		},
		save: function(){
			var _this = this;
			$.ajax({
				url: '/api/work/save',
				type: 'get',
				data: {
					_id: _this.$route.params.id,
					mainCode: JSON.stringify(_this.mainCode)
				},
				success: function(data){
					localStorage[_this.$route.params.id] = null;
					actions.alert(store, {
						show: true,
						msg: '保存成功',
						type: 'success'
					})
				}
			})
		},
		preview: function(ev){
			if($(ev.target).find('.qrcode').hasClass('hide')){
				$(ev.target).find('.qrcode').fadeIn('fast');
				$(ev.target).find('.qrcode').removeClass('hide');
			}else{
				$(ev.target).find('.qrcode').fadeOut('fast')
				$(ev.target).find('.qrcode').addClass('hide');
			}
		}
	}
})

Vue.component('m-head', Head);

module.exports = Head;
	
</script>
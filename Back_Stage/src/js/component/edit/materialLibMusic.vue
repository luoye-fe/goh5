<template>
	<div class="dialog_con" v-show="materialLibMusicObj.show" transition="fade">
		<div class="dialog_bg" @click="hideMaterialLibMusic()"></div>
		<div class="dialog_main_con all_center">
			<div class="dialog_head">
				<h2>素材库</h2>
				<p>{{materialLibMusicObj.msg}}</p>
				<a href="javascript:void(0)" class="dialog_link close" @click="hideMaterialLibMusic()">&times;</a>
			</div>
			<div class="dialog_main lib_con">
				<div class="lib_list">
					<ul class="group">
						<li>我的乐库</li>
					</ul>
					<div class="upload_btn" v-tips="['top','大小不得超过4M（为了更好的体验，请控制音乐大小）']">
						<span>上传音乐</span>
						<input type="file" accept="audio/*" @change="uploadMusic($event)" style="display: block;width: 100%;height: 100%;position: absolute;opacity: 0;left: 0;top: 0;cursor: pointer;"></input>
					</div>
				</div>
				<div class="lib_main">
					<div class="lib_main_head">
						<ul class="lib_main_head_group">
							<li v-show="wholeAttr.bgmusic !== ''"><strong>当前背景音乐：{{wholeAttr.bgmusicName}}</strong><a href="javascript:void(0)" class="close" @click="delBgMusic()">&times;</a></li>
							<li><span>管理</span></li>
						</ul>
						<ul class="lib_main_head_group" style="display: none;">
							<li><span>删除</span></li>
							<li><span>退出管理</span></li>
						</ul>
					</div>
					<div class="lib_main_body">
						<ul class="music_list">
							<li v-for="item in musicList" @click="addBgMusic_e(item.file_path,item.file_name)">
								<p>{{item.file_name}}</p>
								<a href="javascript:void(0)" :music-src="item.file_path" @click.stop="preMuisc($event)">播放</a>
								<span>{{item.file_size | FileSize}}</span>
							</li>
						</ul>
						<m-pagination :pagination-conf="paginationConf"></m-pagination>
					</div>
				</div>
			</div>
			<div class="dialog_bottom">
				<ul class="dialog_btn">
					<li @click="hideMaterialLibMusic()">取消</li>
					<li @click="hideMaterialLibMusic()">确认</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style>
.lib_con{display: flex;flex-direction: row;}
.lib_con .lib_list{width: 200px;display: flex;flex-direction: column;}
.lib_con .lib_list .group{flex: 1;margin-top: 15px;}
.lib_con .lib_list .group li{border-bottom: 1px solid #ccd5db;background: #fff;width: 100%;padding: 0 0 0 20px;box-sizing: border-box;color: #76838f;font-size: 12px;height: 44px;line-height: 44px;cursor: pointer;}
.lib_con .lib_list .upload_btn{width: 100%;height: 44px;line-height: 44px;font-size: 16px;color: #fff;text-align: center;background: #01d7b2;position: relative;}
.lib_con .lib_main{flex: 1;background: #fff;margin-top: 15px;border-top-left-radius: 6px;padding: 0 15px;}
.lib_con .lib_main .lib_main_head{width: 100%;height: 44px;border-bottom: 1px solid #ccd5db;display: flex;justify-content: flex-end;}
.lib_con .lib_main .lib_main_head .lib_main_head_group{font-size: 0;height: 44px;}
.lib_con .lib_main .lib_main_head .lib_main_head_group li{display: inline-block;vertical-align: middle;font-size: 12px;line-height: 44px;margin: 0 5px;padding: 0 10px;}
.lib_con .lib_main .lib_main_head .lib_main_head_group li a{display: inline-block;vertical-align: middle;margin-left: 10px;}
.lib_con .lib_main .lib_main_head .lib_main_head_group li a:hover{color: #01d7b2;}
.lib_con .lib_main .lib_main_head .lib_main_head_group li span{cursor: pointer;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;color: #76838f;}
.lib_con .lib_main .lib_main_head .lib_main_head_group li span:hover{color: #01d7b2;}
.lib_con .lib_main .lib_main_body{}
.lib_con .lib_main .lib_main_body .music_list{width: 100%;font-size: 0;padding: 10px 0;}
.lib_con .lib_main .lib_main_body .music_list li{line-height: 32px;background: #fff;}
.lib_con .lib_main .lib_main_body .music_list li:hover{background: rgba(8,161,239,1)!important;color: #fff!important;cursor: pointer;}
.lib_con .lib_main .lib_main_body .music_list li:hover p{color: #fff!important;}
.lib_con .lib_main .lib_main_body .music_list li:hover span{color: #fff!important;}
.lib_con .lib_main .lib_main_body .music_list li:hover a{color: #fff!important;}
.lib_con .lib_main .lib_main_body .music_list li:nth-child(even){background: #fff;}
.lib_con .lib_main .lib_main_body .music_list li:nth-child(odd){background: rgba(245,245,245,1);}
.lib_con .lib_main .lib_main_body .music_list li>p{display: inline-block;vertical-align: middle;font-size: 12px;color: #76838f;margin-left: 10px;}
.lib_con .lib_main .lib_main_body .music_list li>span{display: inline-block;vertical-align: middle;font-size: 12px;color: #ccc;float: right;margin-right: 10px;}
.lib_con .lib_main .lib_main_body .music_list li>a{display: inline-block;vertical-align: middle;font-size: 12px;color: rgba(8,161,239,1);float: right;margin-right: 10px;}
.lib_con .lib_main .lib_main_body .music_list li>a:hover{text-decoration: underline;}


</style>

<script>
	
var Vue = require('Vue');
var $ = require('jQuery');
var utils = require('utils');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var tips = require('../../directive/tips.js');

var Pagination = require('../common/pagination.vue');

var MaterialLibMusicVm = null;
var MaterialLibMusic = Vue.extend({
	name:'MaterialLibMusic',
	data: function(){
		return {
			musicList: [],
			paginationConf: {
				currentPage: 1,
				totalItems: 0,
				itemsPerPage: 7,
				pagesLength: 5,
				onChange: function(){
					MaterialLibMusicVm.loadMuisc(MaterialLibMusicVm.paginationConf.currentPage);
				}
			}
		}
	},
	init: function(){
		MaterialLibMusicVm = this;
	},
	created: function(){
		this.loadMuisc(this.paginationConf.currentPage);
	},
	components:{
		'm-pagination': Pagination
	},
	props: ['loading'],
	vuex: {
	  	getters: {
	  		materialLibMusicObj: function(){
	  			return store.state.materialLibMusicObj;
	  		},
	  		wholeAttr: function(){
	  			return store.state.wholeAttr;
	  		}
	  	},
	  	actions: actions
	},
	methods:{
		hideMaterialLibMusic: actions.hideMaterialLibMusic,
		delBgMusic: actions.delBgMusic,
		uploadMusic: function(ev){
			var files = ev.target.files;
			var formData = new FormData();
			formData.append('files', files[0]);
			var _this = this;
			if(files[0].size > 4194304){
				alert('请上传小于4M的文件');
				return false;
			}
			_this.loading = true;
			$.ajax({
				url: '/api/audio/upload?file_name=' + files[0].name + '&file_size='+files[0].size,
				type: 'post',
				cache: false,
			    data: formData,
			    processData: false,
			    contentType: false,
				success: function(data){
					_this.loading = false;
					actions.alert(store,{
						show: true,
						msg: data.msg,
						type: 'success'
					})
					_this.paginationConf.currentPage = 1;
					_this.paginationConf.onChange();
				}
			})
		},
		loadMuisc: function(page){
			var _this = this;
			$.ajax({
				url: '/api/audio/list',
				type: 'get',
				data: {
					page: page
				},
				success: function(data){
					_this.musicList = data.data.musicList
					_this.paginationConf.totalItems = data.data.totalItems;
				}
			})
		},
		preMuisc: function(ev){
			var src = $(ev.target).attr('music-src');
			if($('#pre_music').length === 0){
				var audio = document.createElement('audio');
				$(audio).attr('id','pre_music');
				$(audio).appendTo($('body'));
				$(audio).attr('src',src);
				$(audio).attr('autoplay','autoplay');
				$(ev.target).html('暂停');
			}else{
				if($(ev.target).html() === '暂停'){
					$(ev.target).html('播放');
					$('#pre_music')[0].pause();
					return;
				}
				$('.music_list a').html('播放');
				if($(ev.target).html() === '播放'){
					$(ev.target).html('暂停');
					if($('#pre_music').attr('src') !== src){
						$('#pre_music').attr('src',src);
					}else{
						$('#pre_music')[0].play();	
					}
					return;
				}
			}
		},
		addBgMusic_e: function(src,name){
			actions.addBgMusic(store,src,name);
		}
	}
})

module.exports = MaterialLibMusic;

</script>
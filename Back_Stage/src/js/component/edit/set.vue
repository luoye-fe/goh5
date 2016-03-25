<template>
	<div class="set_page" v-show="showSet" transition="fade">
		<div class="set_bg" v-show="showSet" @click="showSet=false"></div>
		<div class="set_con" v-show="showSet" transition="fromRight">
			<div class="left">
				<div class="item">
					<h4>分享图</h4>
					<div class="thumbnail">
						<img :src="about.thumbnail">
						<span>
							点击上传
							<input type="file" accept="image/gif, image/jpeg, image/png, image/jpg" @change="uploadThumbnail($event)"></input>
						</span>
					</div>
					<em class="tips">（请上传300*300以上正方形图片）</em>
				</div>
				<div class="item">
					<h4>预览</h4>
					<a class="qrcode" v-qrcode="'http://'+ host + '/show/' + this.$route.params.id" :href="'http://'+ host + '/show/' + this.$route.params.id" target="_blank"></a>
					<em class="tips">（点击或扫描预览作品）</em>
					<em class="tips">（发布后的作品可在全部作品中展示）</em>
				</div>
				<div class="item set_btn">
					<a href="javascript:void(0)" @click="save()">保存</a>
					<a href="javascript:void(0)" @click="release()">发布</a>
				</div>
			</div>
			<div class="right">
				<div class="item">
					<div class="head">基本信息</div>
					<div class="main">
						<div class="kind">
							<label><span>*</span>作品标题</label>
							<input type="text" placeholder="请输入作品标题" data-type="title" :value="workData.title"></input>
						</div>
						<div class="kind">
							<label><span>*</span>关键字</label>
							<input type="text" placeholder="请输入作品关键字" data-type="keywords" :value="about.keyWords"></input>
						</div>
						<div class="kind">
							<label><span>*</span>作品描述</label>
							<textarea placeholder="请输入作品描述" data-type="desc" :value="about.desc"></textarea>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="head">高级设置</div>
					<div class="main">
                        <div class="kind">
                            <label><span>*</span>循环播放</label>
                            <input type="checkbox" data-type="loop" :checked="setConfig.loop" :value="checked"></input>
                        </div>
						<div class="kind">
                            <label><span>*</span>翻页方向</label>
                            <select data-type="direction" :value="setConfig.direction">
                                <option value="vertical">垂直翻页</option>
                                <option value="horizontal">水平翻页</option>
                            </select>
                        </div>
                        <div class="kind">
                            <label><span>*</span>翻页特效</label>
                            <select data-type="effect" :value="setConfig.effect">
                                <option value="slide">滑动切换</option>
                                <option value="fade">淡入淡出</option>
                                <option value="cube">立体翻转</option>
                                <option value="coverflow">封面翻转</option>
                                <option value="flip">3D翻转</option>
                            </select>
                        </div>
                        <div class="kind">
                            <label><span>*</span>记录浏览历史</label>
                            <input type="checkbox" data-type="autoBackPrePage" :checked="setConfig.autoBackPrePage"></input>
                        </div>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<style>
.set_page{position: fixed;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6);z-index: 99999;}
.set_bg{position: absolute;width: 100%;height: 100%;top: 0;left: 0;}
.set_con{position: absolute;right: 0;background-color: #fff;width: 700px;height: 100%;top: 0;display: flex;flex-direction: row;padding: 10px 0;}
.set_con .left{width: 300px;overflow-y: auto;padding-bottom: 170px;}
.set_con .left .item{width: 100%;box-sizing: border-box;margin-top: 20px;}
.set_con .left .item h4{color: #76838f;font-size: 14px;line-height: 28px;width: 220px;display: block;margin: 0 auto;}
.set_con .left .item .thumbnail{width: 220px;position: relative;border: 1px solid #c6cbd4;background: #c6cbd4;margin: 10px auto 0;box-sizing: border-box;}
.set_con .left .item .thumbnail img{display: block;width: 218px;height: 218px;}
.set_con .left .item .thumbnail span{display: block;position: relative;width: 100%;height: 32px;line-height: 32px;text-align: center;background: #01d7b2;color: #fff;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;cursor: pointer;border-top: 1px solid #c6cbd4;}
.set_con .left .item .thumbnail input{display: block;position: absolute;top: 0;left: 0;opacity: 0;font-size: 0;width: 100%;height: 100%;padding: 0;margin: 0;cursor: pointer;}
.set_con .left .item .thumbnail span:hover{background: #fff;color: #01d7b2;}
.set_con .left .item .tips{font-size: 12px;line-height: 24px;color: #76838f;display: block;width: 80%;text-align: center;background-color: #fff;font-style: normal;margin: 0 auto;}
.set_con .left .item .qrcode{width: 220px;padding: 10px;background-color: #fff;border: 1px solid #c6cbd4;margin: 10px auto 0;display: block;box-sizing: border-box;}
.set_con .left .item.set_btn{width: 100%;font-size: 0;text-align: center;}
.set_con .left .item.set_btn a{display: inline-block;vertical-align: middle;font-size: 12px;color: #fff;padding: 10px 25px;margin: 0 8px;cursor: pointer;border-radius: 6px;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.set_con .left .item.set_btn a:first-child{background: rgba(1,215,178,1);}
.set_con .left .item.set_btn a:first-child:hover{background: rgba(1,215,178,0.7);}
.set_con .left .item.set_btn a:last-child{background: rgba(8,161,239,1);}
.set_con .left .item.set_btn a:last-child:hover{background: rgba(8,161,239,0.7);}
.set_con .right{flex: 1;padding-top: 38px;padding-bottom: 170px;overflow-y: auto;}
.set_con .right .item{margin-top: 20px;width: 100%;}
.set_con .right .item .head{width: 100%;background: url('/back/dist/img/basic_info_title.png') no-repeat;color: #fff;font-size: 12px;line-height: 20px;text-indent: 15px;}
.set_con .right .item .main{}
.set_con .right .item .main .kind{margin-top: 15px;}
.set_con .right .item .main .kind label{font-size: 14px;color: #76838f;display: inline-block;width: 100px;position: relative;text-indent: 14px;margin-top: 7px;}
.set_con .right .item .main .kind label span{color: #01d7b2;position: absolute;font-size: 20px;left: -14px;top: 1px;}
.set_con .right .item .main input{width: 270px;display: inline-block;vertical-align: middle;line-height: 30px;padding: 0 10px;box-sizing: border-box;border: 1px solid #c6cbd4;font-size: 14px;color: #76838f;}
.set_con .right .item .main textarea{width: 270px;display: inline-block;vertical-align: top;padding: 0 10px;font-size: 14px;border: 1px solid #c6cbd4;color: #76838f;box-sizing: border-box;line-height: 26px;resize: none;height: 120px;outline: none;}
</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var Router = require('vue-route');
Vue.use(Router);
var router = new Router();

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
    methods: {
    	uploadThumbnail: function(ev){
    		var id = this.$route.params.id;
    		var file = ev.target.files;
    		var formData = new FormData();
    		var reader = new FileReader();
    		var imgDiv = $('.thumbnail img');
    		reader.onload = (function(aImg) { 
      			return function(e) { 
        			aImg.src = e.target.result; 
      			}; 
    		})(imgDiv[0]);
    		reader.readAsDataURL(file[0]);
    		formData.append('file', file[0]);
    		$.ajax({
    			url: '/api/img/uploadThumbnail?id=' + id,
    			type: 'post',
    			cache: false,
    		    data: formData,
    		    processData: false,
    		    contentType: false,
    			success: function(data){
    				if(!data.iserro){
    					actions.alert(store,{
    						show: true,
    						msg: '上传成功',
    						type: 'success'
    					})
    				}
    			}
    		})
    	},
    	save: function(){
    		var params = {};
    		$('[data-type]').each(function(index,ele){
                if($(this).attr('type') === 'checkbox'){
                    params[$(this).attr('data-type')] = $(this)[0].checked;
                }else{
                    params[$(this).attr('data-type')] = $(this).val();
                }
    		})
    		params.id = this.$route.params.id;
    		$.ajax({
    			url: '/api/work/saveSet',
    			type: 'get',
    			data: params,
    			success: function(data){
    				if(!data.iserro){
						actions.alert(store,{
							show: true,
							msg: data.msg,
							type: 'success'
						})
					}
    			}
    		})
    	},
    	release: function(){
    		var _this = this;
    		$.ajax({
    			url: '/api/work/release',
    			type: 'get',
    			data: {
    				id: _this.$route.params.id
    			},
    			success: function(data){
    				if(!data.iserro){
						actions.alert(store,{
							show: true,
							msg: data.msg,
							type: 'success'
						})
					}
    			}
    		})
    	},
    	checkBaseInfo: function(){

    	}
    }
})

module.exports = SetPage;

</script>
<template>
	<div class="side_con right" v-show="checkedItems.length == 1" transition="fromRight">
		<div class="item attrList">
			<div class="head">元素属性</div>
			<div class="main">
				<ul class="nav_top_btn">
					<li :class="{'active':nav_top_btn == 0}" @click="this.nav_top_btn=0">样式</li>
					<li :class="{'active':nav_top_btn == 1}" @click="this.nav_top_btn=1">动画</li>
					<li :class="{'active':nav_top_btn == 2}" @click="this.nav_top_btn=2">事件</li>
				</ul>
				<div class="attr_main" v-show="nav_top_btn == 0">
					<ul class="group">
						<li>
							<div class="group_head" :class="{'active':group_index === 0}" @click="group_index == 0 ? group_index = null : group_index = 0">
								<h4>基础样式</h4>
								<span class="caret" :class="{'caret_close':group_index !== 0}"></span>
							</div>
							<div class="group_main" v-show="group_index === 0">
								<ul>
									<li style-attr="background-color">
										<span>背景颜色</span>
										<input type="color" :value="style['background-color']" @input="setStyleDirect($event,'color')"></input>
										<input type="text" :value="style['background-color']" @input="setStyleDirect($event,'color')"></input>
									</li>
									<li style-attr="color">
										<span>文字颜色</span>
										<input type="color" :value="style['color']" @input="setStyleDirect($event,'color')"></input>
										<input type="text" :value="style['color']" @input="setStyleDirect($event,'color')"></input>
									</li>
									<li style-attr="opacity">
										<span>透明度</span>
										<input type="range" min="0" max="1" step="0.1" :value="style['opacity'] | Number '1'" @input="setStyleDirect($event,'number')"></input>
										<input type="number" min="0" max="1" step="0.1" :value="style['opacity'] | Number '1'" @input="setStyleDirect($event,'number')"></input>
									</li>
									<li style-attr="padding">
										<span>内边距</span>
										<input type="range" min="0" max="50" step="1" :value="style['padding'] | Number '0'" @input="setStyleDirect($event,'number','px')"></input>
										<input type="number" min="0" max="50" step="1" :value="style['padding'] | Number '0'" @input="setStyleDirect($event,'number','px')"></input>
									</li>
									<li style-attr="line-height">
										<span>行高</span>
										<input type="range" min="0" max="50" step="0.5" :value="style['line-height']" @input="setStyleDirect($event,'number')"></input>
										<input type="number" min="0" max="50" step="0.5" :value="style['line-height']" @input="setStyleDirect($event,'number')"></input>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<div class="group_head" :class="{'active':group_index === 1}"  @click="group_index == 1 ? group_index = null : group_index = 1">
								<h4>边框样式</h4>
								<span class="caret" :class="{'caret_close':group_index !== 1}"></span>
							</div>
							<div class="group_main" v-show="group_index === 1">
								<ul>
									<li style-attr="border-style">
										<span>样式</span>
										<select :value="style['border-style']" @input="setStyleDirect($event)">
											<option value="">无</option>
											<option value="solid">直线</option>
											<option value="dashed">虚线</option>
											<option>双实线</option>
										</select>
									</li>
									<li style-attr="border-width">
										<span>粗细</span>
										<input type="range" min="0" max="50" step="1" :value="style['border-width'] | Number" @input="setStyleDirect($event,'number','px')"></input>
										<input type="number" min="0" max="50" step="1" :value="style['border-width'] | Number" @input="setStyleDirect($event,'number','px')"></input>
									</li>
									<li style-attr="border-radius">
										<span>圆角</span>
										<input type="range" min="0" max="50" :value="style['border-radius'] | Number" @input="setStyleDirect($event,'number','px')"></input>
										<input type="number" min="0" max="50" :value="style['border-radius'] | Number" @input="setStyleDirect($event,'number','px')"></input>
									</li>
									<li style-attr="border-color">
										<span>颜色</span>
										<input type="color" :value="style['border-color']" @input="setStyleDirect($event,'color')"></input>
										<input type="text" :value="style['border-color']" @input="setStyleDirect($event,'color')"></input>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<div class="group_head" :class="{'active':group_index === 2}"  @click="group_index == 2 ? group_index = null : group_index = 2">
								<h4>阴影样式</h4>
								<span class="caret" :class="{'caret_close':group_index !== 2}"></span>
							</div>
							<div class="group_main" v-show="group_index === 2">
								<ul>
									<li style-attr="box-shadow-x">
										<span>X轴位置</span>
										<input type="range" :value="boxShadowStyle['box-shadow-x'] | Number" @input="setBoxShadow($event,'number','px')"></input>
										<input type="number" :value="boxShadowStyle['box-shadow-x'] | Number" @input="setBoxShadow($event,'number','px')"></input>
									</li>
									<li style-attr="box-shadow-y">
										<span>Y轴位置</span>
										<input type="range" :value="boxShadowStyle['box-shadow-y'] | Number" @input="setBoxShadow($event,'number','px')"></input>
										<input type="number" :value="boxShadowStyle['box-shadow-y'] | Number" @input="setBoxShadow($event,'number','px')"></input>
									</li>
									<li style-attr="box-shadow-blur">
										<span>模糊距离</span>
										<input type="range" :value="boxShadowStyle['box-shadow-blur'] | Number" @input="setBoxShadow($event,'number','px')"></input>
										<input type="number" :value="boxShadowStyle['box-shadow-blur'] | Number" @input="setBoxShadow($event,'number','px')"></input>
									</li>
									<li style-attr="box-shadow-size">
										<span>尺寸</span>
										<input type="range" :value="boxShadowStyle['box-shadow-size'] | Number" @input="setBoxShadow($event,'number','px')"></input>
										<input type="number" :value="boxShadowStyle['box-shadow-size'] | Number" @input="setBoxShadow($event,'number','px')"></input>
									</li>
									<li style-attr="box-shadow-color">
										<span>颜色</span>
										<input type="color" :value="boxShadowStyle['box-shadow-color']" @input="setBoxShadow($event,'color')"></input>
										<input type="text" :value="boxShadowStyle['box-shadow-color']" @input="setBoxShadow($event,'color')"></input>
									</li>
									<li style-attr="box-shadow-place">
										<span>内部阴影</span>
										<label for="inset">是否设置为内部阴影</label>
										<input type="checkbox" id="inset" :value="boxShadowStyle['box-shadow-place'] === inset" @change="setBoxShadow($event,'checked')"></input>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div class="attr_main" v-show="nav_top_btn == 1">
					<ul class="ani_btn">
						<li>添加动画</li>
						<li>预览动画</li>
					</ul>
				</div>
				<div class="attr_main" v-show="nav_top_btn == 2">
					3
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.attrList{height: 100%;display: flex;flex-direction: column;}
.attrList .main{display: flex;flex-direction: column;flex: 1;}
.attrList .main .nav_top_btn{font-size: 0;box-sizing: border-box;text-align: center;padding-top: 13px;}
.attrList .main .nav_top_btn li{display: inline-block;vertical-align: top;background: #f0f3f4;text-align: center;line-height: 38px;color: #76838f;font-size: 12px;width: 30%;border-top-right-radius: 8px;border-top-left-radius: 8px;cursor: pointer;margin: 0 3px;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.attrList .main .nav_top_btn li.active{background: #01d7b2;color: #fff;}
.attrList .main .nav_top_btn li:hover{background: #01d7b2;color: #fff;}
.attrList .main .attr_main{flex: 1;height: 100%;overflow-y: auto;background: #f0f3f4;}
.attrList .main .attr_main .group{margin-top: 10px;position: relative;z-index: 2;overflow: hidden;}
.attrList .main .attr_main .group>li{}
.attrList .main .attr_main .group>li .group_head{font-size: 12px;color: #76838f;padding: 0 15px;border-bottom: 1px solid #ccd5db;position: relative;cursor: pointer;position: relative;z-index: 2;}
.attrList .main .attr_main .group>li .group_head:hover{background: #f6f9fa;}
.attrList .main .attr_main .group>li .group_head.active{background: #f6f9fa;}
.attrList .main .attr_main .group>li .group_head h4{display: inline-block;vertical-align: middle;line-height: 44px;}
.attrList .main .attr_main .group>li .group_head .caret{position: absolute;right: 20px;top: 50%;margin-top: -4px;}
.attrList .main .attr_main .group>li .group_main{background: #fff;overflow: hidden;position: relative;z-index: 1;}
.attrList .main .attr_main .group>li .group_main>ul{padding: 0 20px 10px;}
.attrList .main .attr_main .group>li .group_main>ul>li{height: 37px;border-bottom: 1px solid #ccd5db;font-size: 0;}
.attrList .main .attr_main .group>li .group_main>ul>li span{font-size: 12px;color: #76838f;line-height: 38px;display: inline-block;vertical-align: middle;width: 75px;text-align: left;}
.attrList .main .attr_main .group>li .group_main>ul>li input{border: none;padding: 0;margin: 0;box-shadow: none;display: inline-block;vertical-align: middle;box-sizing: border-box;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="text"]:focus{border: 1px solid #01d7b2;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="number"]:focus{border: 1px solid #01d7b2;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="color"]{width: 45px;margin-right: 20px;border: 1px solid #ccd5db;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="text"]{width: 100px;border: 1px solid #ccd5db;height: 20px;line-height: 20px;font-size: 12px;color: #76838f;padding: 0 5px;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="range"]{width: 100px;margin-right: 20px;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="number"]{width: 45px;border: 1px solid #ccd5db;height: 20px;line-height: 20px;font-size: 12px;color: #76838f;padding: 0 0 0 3px;}
.attrList .main .attr_main .group>li .group_main>ul>li select{display: inline-block;vertical-align: middle;width: 165px;}
.attrList .main .attr_main .group>li .group_main>ul>li label{font-size: 12px;margin-right: 10px;line-height: 38px;color: #76838f;display: inline-block;vertical-align: middle;}
::-webkit-color-swatch-wrapper {background-color: #fff;padding: 0;}
::-webkit-color-swatch {border: none;}
input[type=range]::-webkit-slider-thumb{margin-top: -3.6px;}
input[type=range]::-webkit-slider-runnable-track{width: 100%;height: 8.4px;cursor: pointer;box-shadow: 0 0 3px rgba(0,0,0,0.7);background: #01d7b2;border-radius: 1px;border: none;outline: none;}
input[type=range]:focus{outline: none;}
.attrList .main .attr_main .ani_btn{font-size: 0;padding: 20px 0;text-align: center;}
.attrList .main .attr_main .ani_btn li{display: inline-block;vertical-align: middle;font-size: 12px;color: #fff;padding: 10px 25px;margin: 0 8px;cursor: pointer;border-radius: 6px;}
.attrList .main .attr_main .ani_btn li:first-child{background: rgba(1,215,178,1);}
.attrList .main .attr_main .ani_btn li:first-child:hover{background: rgba(1,215,178,0.7);}
.attrList .main .attr_main .ani_btn li:last-child{background: rgba(8,161,239,1);}
.attrList .main .attr_main .ani_btn li:last-child:hover{background: rgba(8,161,239,0.7);}

</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var utils = require('utils');
var filter = require('../../filter/index.js');

var AttrList = Vue.extend({
	name: 'AttrList',
	data: function(){
		return {
			nav_top_btn: 0,
			group_index: 0,
			style: {},
			boxShadowStyle: {}
		}
	},
	vuex: {
	  	getters: {
	  		checkedItems: function(){
				return store.state.checkedItems;
			},
			currentPageData: function(){
				return store.state.currentPageData;
			}
	  	},
	  	actions: actions
	},
	ready: function(){
		
	},
	methods: {
		selectPage: actions.selectPage,
		addPage: actions.addPage,
		setStyleDirect: function(ev, type, px){ // px 单位
			var styleAttr = $(ev.target).parents('li[style-attr]').attr('style-attr');
			var value = $(ev.target).val();
			if(px){
				value = value + px;
			}
			var params = {};
			params[styleAttr] = value;
			actions.setStyle(store,this.checkedItems[0], params)
			this.style = utils.getStyle(this.checkedItems[0],'all');
		},
		setBoxShadow: function(ev,type,px){
			var styleAttr = $(ev.target).parents('li[style-attr]').attr('style-attr');
			var value;
			if(type === 'checked'){
				value = $(ev.target)[0].checked ? 'inset' : '';
			}else{
				value = $(ev.target).val();
			}
			if(px){
				value = value + px;
			}
			this.boxShadowStyle[styleAttr] = value;
			var boxShadowValue = this.boxShadowStyle['box-shadow-x'] + ' ' + this.boxShadowStyle['box-shadow-y'] + ' ' + this.boxShadowStyle['box-shadow-blur'] + ' ' + this.boxShadowStyle['box-shadow-size'] + ' ' + this.boxShadowStyle['box-shadow-color'] + ' ' + this.boxShadowStyle['box-shadow-place'];
			actions.setStyle(store,this.checkedItems[0], {
				'box-shadow': boxShadowValue
			})
		},
		formatBoxShadow: function(boxShadowStr){
			var result = {};
			var _arr = boxShadowStr.split(' ');
			result['box-shadow-x'] = _arr[0];
			result['box-shadow-y'] = _arr[1];
			result['box-shadow-blur'] = _arr[2];
			result['box-shadow-size'] = _arr[3];
			result['box-shadow-color'] = _arr[4];
			result['box-shadow-place'] = _arr[5] ? _arr[5] : '';
			return result;
		}
	},
	watch: {
		'checkedItems': {
			handler: function(value){
				var _this = this;
				if(this.checkedItems[0] !== undefined){
					this.style = utils.getStyle(this.checkedItems[0],'all');
					this.boxShadowStyle = this.formatBoxShadow(utils.getStyle(this.checkedItems[0],'box-shadow'));
					// 调试
					// this.$log('style');
					// this.$log('boxShadowStyle');
				}
			},
			deep: true,
			immediate: true
		}
	}

})

module.exports = AttrList;

</script>
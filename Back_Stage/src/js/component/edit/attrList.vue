<template>
	<div class="side_con right" v-show="checkedItems.length == 1" transition="fromRight">
		<div class="item attrList">
			<div class="head">元素属性</div>
			<div class="item_id">元素ID为 : <span>{{checkedItemDataOnlyOne.id}}</span></div>
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
									<li style-attr="color" v-show="itemType === 'txt'">
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
									<li style-attr="line-height" v-show="itemType === 'txt'">
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
											<option value="none">无</option>
											<option value="solid">直线</option>
											<option value="dashed">虚线</option>
											<option value="dotted">点线</option>
											<option value="double">双实线</option>
											<option value="groove">3D凹槽</option>
											<option value="ridge">3D垄状</option>
											<option value="inset">3D内阴影</option>
											<option value="outset">3D外阴影</option>
										</select>
									</li>
									<li style-attr="border-width">
										<span>粗细</span>
										<input type="range" min="0" max="50" step="1" :value="style['border-width'] | Number" @input="setStyleDirect($event,'number','px')"></input>
										<input type="number" min="0" max="50" step="1" :value="style['border-width'] | Number" @input="setStyleDirect($event,'number','px')"></input>
									</li>
									<li style-attr="border-radius">
										<span>圆角</span>
										<input type="range" min="0" max="50" step="1" :value="style['border-radius'] | Number" @input="setStyleDirect($event,'number','px')"></input>
										<input type="number" min="0" max="50" step="1" :value="style['border-radius'] | Number" @input="setStyleDirect($event,'number','px')"></input>
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
										<label for="inset">设置为内部阴影</label>
										<input type="checkbox" id="inset" :value="boxShadowStyle['box-shadow-place'] === inset" @change="setBoxShadow($event,'checked')"></input>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div class="attr_main" v-show="nav_top_btn == 1">
					<ul class="group">
						<li v-for="item in aniStyleAttr">
							<div class="group_head" :class="{'active':group_index === 0}" @click="group_index == $index ? group_index = null : group_index = $index">
								<h4>动画 {{$index + 1}}</h4>
								<span class="caret" :class="{'caret_close':group_index !== $index}"></span>
							</div>
							<span class="deleteAni close" @click="delAni($index)">&times;</span>
							<div class="group_main" v-show="group_index === $index">
								<ul>
									<li style-attr="ani-name">
										<span>动画名称</span>
										<select :value="item['ani-name']" @input="setAni($index,$event)">
											<option value="none">none | 无效果</option>
                                            <option value="flash">flash | 闪烁</option>
                                            <option value="shake">shake | 摇动</option>
                                            <option value="bounce">bounce | 弹性</option>
                                            <option value="wiggle">wiggle | 扭动</option>
                                            <option value="tada">tada | 弹加摇动</option>
                                            <option value="swing">swing | 摇摆(小)</option>
                                            <option value="wobble">wobble | 摇晃(大)</option>
                                            <option value="pulse">pulse | 脉冲放大</option>
                                            <option value="flip">flip</option> 兼容性有问题
                                            <option value="rollIn">rollIn | 滚入</option>
                                            <option value="lightSpeedIn">lightSpeedIn | 惯性出现</option>
                                            <option value="flipInX">flipInX | X轴翻滚出现</option>
                                            <option value="flipInY">flipInY | Y轴翻滚出现</option>
                                            <option value="fadeIn">fadeIn | 淡入</option>
                                            <option value="fadeInUp">fadeInUp | 向上淡入</option>
                                            <option value="fadeInDown">fadeInDown | 向下淡入</option>
                                            <option value="fadeInLeft">fadeInLeft | 从左淡入</option>
                                            <option value="fadeInRight">fadeInRight | 从右淡入</option>
                                            <option value="fadeInUpBig">fadeInUpBig | 向上淡入（大幅度）</option>
                                            <option value="fadeInDownBig">fadeInDownBig | 向下淡入(大幅度)</option>
                                            <option value="fadeInLeftBig">fadeInLeftBig | 从左淡入(大幅度)</option>
                                            <option value="fadeInRightBig">fadeInRightBig | 从右淡入(大幅度)</option>
                                            <option value="bounceIn">bounceIn | 弹入</option>
                                            <option value="bounceInUp">bounceInUp | 向上弹出</option>
                                            <option value="bounceInDown">bounceInDown | 从下弹出</option>
                                            <option value="bounceInLeft">bounceInLeft | 从左弹出</option>
                                            <option value="bounceInRight">bounceInRight | 从右弹出</option>
                                            <option value="rotateIn">rotateIn | 旋转出现</option>
                                            <option value="rotateInUpLeft">rotateInUpLeft | 向上转出（左）</option>
                                            <option value="rotateInDownLeft">rotateInDownLeft | 向下转出（左）</option>
                                            <option value="rotateInUpRight">rotateInUpRight | 向上转出（右）</option>
                                            <option value="rotateInDownRight">rotateInDownRight | 向下转出（右）</option>
                                            <option value="rollOut">rollOut | 滚出</option>
                                            <option value="hinge">hinge | 悬挂掉出</option>
                                            <option value="lightSpeedOut">lightSpeedOut | 惯性消失</option>
                                            <option value="flipOutX">flipOutX | X轴翻滚消失</option>
                                            <option value="flipOutY">flipOutY | Y轴翻滚消失</option>
                                            <option value="fadeOut">fadeOut | 淡出</option>
                                            <option value="fadeOutUp">fadeOutUp | 向上淡出</option>
                                            <option value="fadeOutDown">fadeOutDown | 向下淡出</option>
                                            <option value="fadeOutLeft">fadeOutLeft | 向左淡出</option>
                                            <option value="fadeOutRight">fadeOutRight | 向右淡出</option>
                                            <option value="fadeOutUpBig">fadeOutUpBig | 向上淡出（大幅度）</option>
                                            <option value="fadeOutDownBig">fadeOutDownBig | 向下淡出（大幅度）</option>
                                            <option value="fadeOutLeftBig">fadeOutLeftBig | 向左淡出（大幅度）</option>
                                            <option value="fadeOutRightBig">fadeOutRightBig | 向右淡出（大幅度）</option>
                                            <option value="bounceOut">bounceOut | 弹出后消失</option>
                                            <option value="bounceOutUp">bounceOutUp | 向上弹出</option>
                                            <option value="bounceOutDown">bounceOutDown | 向下弹出</option>
                                            <option value="bounceOutLeft">bounceOutLeft | 向左弹出</option>
                                            <option value="bounceOutRight">bounceOutRight | 向右弹出</option>
                                            <option value="rotateOut">rotateOut | 旋转消失</option>
                                            <option value="rotateOutUpLeft">rotateOutUpLeft | 向上转出（左）</option>
                                            <option value="rotateOutDownLeft">rotateOutDownLeft | 向下转出（左）</option>
                                            <option value="rotateOutUpRight">rotateOutUpRight | 向上转出（右）</option>
                                            <option value="rotateOutDownRight">rotateOutDownRight | 向下转出（右）</option>
										</select>
									</li>
									<li style-attr="ani-duration">
										<span>动画时长</span>
										<input type="range" min="0" max="10" step="0.1" :value="item['ani-duration'] | Number '0'" @input="setAni($index,$event,'number','s')"></input>
										<input type="number" min="0" max="10" step="0.1" :value="item['ani-duration'] | Number '0'" @input="setAni($index,$event,'number','s')"></input>
									</li>
									<li style-attr="ani-tween">
										<span>动画曲线</span>
										<select :value="item['ani-tween']" @input="setAni($index,$event)">
											<option value="ease">ease | 自然</option>
											<option value="linear">linear | 匀速</option>
											<option value="ease-in">linear | 加速</option>
											<option value="ease-out">linear | 减速</option>
										</select>
									</li>
									<li style-attr="ani-delay">
										<span>动画延时</span>
										<input type="range" min="0" max="50" step="0.1" :value="item['ani-delay'] | Number '0'" @input="setAni($index,$event,'number','s')"></input>
										<input type="number" min="0" max="50" step="0.1" :value="item['ani-delay'] | Number '0'" @input="setAni($index,$event,'number','s')"></input>
									</li>
									<li style-attr="ani-count">
										<span>动画次数</span>
										<input type="number" min="0" max="10" step="1" :value="item['ani-count'] | Number '0'" @input="setAni($index,$event,'number')" :disabled="item['ani-count'] === 'infinite'"></input>
										<input type="checkbox" id="infinite" :checked="item['ani-count'] === 'infinite'" @change="setAni($index,$event,'checked')" style="margin-left: 15px;"></input>
										<label for="infinite" style="margin-left: 8px;">循环</label>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					<ul class="ani_btn">
						<li @click="addAni()">添加动画</li>
						<li @click="reloadAni()">预览动画</li>
					</ul>
				</div>
				<div class="attr_main" v-show="nav_top_btn == 2">
					敬请期待～
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.attrList{height: 100%;display: flex;flex-direction: column;}
.attrList .main{display: flex;flex-direction: column;flex: 1;}
.attrList .main .nav_top_btn{font-size: 0;box-sizing: border-box;text-align: center;}
.attrList .main .nav_top_btn li{display: inline-block;vertical-align: top;background: #f0f3f4;text-align: center;line-height: 38px;color: #76838f;font-size: 12px;width: 30%;border-top-right-radius: 8px;border-top-left-radius: 8px;cursor: pointer;margin: 0 3px;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.attrList .main .nav_top_btn li.active{background: #01d7b2;color: #fff;}
.attrList .main .nav_top_btn li:hover{background: #01d7b2;color: #fff;}
.attrList .main .attr_main{flex: 1;height: 100%;overflow-y: auto;background: #f0f3f4;}
.attrList .main .attr_main .group{margin-top: 10px;position: relative;z-index: 2;overflow: hidden;}
.attrList .main .attr_main .group>li{position: relative;}
.attrList .main .attr_main .group>li .group_head{font-size: 12px;color: #76838f;padding: 0 15px;border-bottom: 1px solid #ccd5db;position: relative;cursor: pointer;position: relative;z-index: 2;}
.attrList .main .attr_main .group>li .group_head:hover{background: #f6f9fa;}
.attrList .main .attr_main .group>li .group_head.active{background: #f6f9fa;}
.attrList .main .attr_main .group>li .group_head h4{display: inline-block;vertical-align: middle;line-height: 44px;}
.attrList .main .attr_main .group>li .group_head .caret{position: absolute;right: 20px;top: 50%;margin-top: -4px;}
.attrList .main .attr_main .group>li .deleteAni{position: absolute;display: block;color: #ff5151;font-size: 34px;top: 4px;right: 40px;z-index: 9;}
.attrList .main .attr_main .group>li .deleteAni.close{opacity: 0.5;}
.attrList .main .attr_main .group>li .deleteAni.close:hover{opacity: 1;}
.attrList .main .attr_main .group>li .group_main{background: #fff;overflow: hidden;position: relative;z-index: 1;}
.attrList .main .attr_main .group>li .group_main>ul{padding: 0 20px 10px;}
.attrList .main .attr_main .group>li .group_main>ul>li{height: 37px;border-bottom: 1px solid #ccd5db;font-size: 0;display: flex;flex: row;justify-content: space-between;align-items: center;}
.attrList .main .attr_main .group>li .group_main>ul>li span{font-size: 12px;color: #76838f;line-height: 38px;display: inline-block;vertical-align: middle;width: 75px;text-align: left;}
.attrList .main .attr_main .group>li .group_main>ul>li input{border: none;padding: 0;margin: 0;box-shadow: none;display: inline-block;vertical-align: middle;box-sizing: border-box;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="text"]:focus{border: 1px solid #01d7b2;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="number"]:focus{border: 1px solid #01d7b2;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="color"]{width: 40px;margin-right: 20px;border: 1px solid #ccd5db;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="text"]{width: 85px;border: 1px solid #ccd5db;height: 20px;line-height: 20px;font-size: 12px;color: #76838f;padding: 0 5px;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="range"]{width: 85px;margin-right: 20px;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="number"]{width: 40px;border: 1px solid #ccd5db;height: 20px;line-height: 20px;font-size: 12px;color: #76838f;padding: 0 0 0 3px;}
.attrList .main .attr_main .group>li .group_main>ul>li input[type="number"]:disabled{cursor: not-allowed;}
.attrList .main .attr_main .group>li .group_main>ul>li select{display: inline-block;vertical-align: middle;width: 145px;}
.attrList .main .attr_main .group>li .group_main>ul>li label{font-size: 12px;margin-right: 10px;line-height: 38px;color: #76838f;display: inline-block;vertical-align: middle;}
::-webkit-color-swatch-wrapper {background-color: #fff;padding: 0;}
::-webkit-color-swatch {border: none;}
input[type=range]::-webkit-slider-thumb{margin-top: -3.6px;}
input[type=range]::-webkit-slider-runnable-track{width: 100%;height: 8.4px;cursor: pointer;box-shadow: 0 0 3px rgba(0,0,0,0.7);background: #01d7b2;border-radius: 1px;border: none;outline: none;}
input[type=range]:focus{outline: none;}
.attrList .main .attr_main .ani_btn{font-size: 0;padding: 20px 0;text-align: center;}
.attrList .main .attr_main .ani_btn li{display: inline-block;vertical-align: middle;font-size: 12px;color: #fff;padding: 10px 25px;margin: 0 8px;cursor: pointer;border-radius: 6px;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.attrList .main .attr_main .ani_btn li:first-child{background: rgba(1,215,178,1);}
.attrList .main .attr_main .ani_btn li:first-child:hover{background: rgba(1,215,178,0.7);}
.attrList .main .attr_main .ani_btn li:last-child{background: rgba(8,161,239,1);}
.attrList .main .attr_main .ani_btn li:last-child:hover{background: rgba(8,161,239,0.7);}
.item_id{font-size: 14px;line-height: 28px;width: 100%;text-align: center;color: #76838f}
.item_id span{color: #01d7b2;}

</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var utils = require('utils');
var filter = require('../../filter/index.js');

var AttrListVm = null;
var AttrList = Vue.extend({
	name: 'AttrList',
	data: function(){
		return {
			itemType: '',
			nav_top_btn: 0,
			group_index: 0,
			style: {},
			boxShadowStyle: {},
			aniStyleAttr: []
		}
	},
	vuex: {
	  	getters: {
	  		checkedItems: function(){
				return store.state.checkedItems;
			},
			currentPageData: function(){
				return store.state.currentPageData;
			},
			checkedItemDataOnlyOne: function(){
				return store.state.checkedItemDataOnlyOne;
			}
	  	},
	  	actions: actions
	},
	init: function(){
		AttrListVm = this;
	},
	methods: {
		selectPage: actions.selectPage,
		addPage: actions.addPage,
		setStyleDirect: function(ev, type, px){ // px 单位
			var styleAttr = $(ev.target).parents('li[style-attr]').attr('style-attr');
			var value = $(ev.target).val();
			if(type === 'color'){
				if(value.indexOf('#') > -1 && value.length !== 7){
					return;
				}
				if(!utils.checkIsColor(value)){
					return;
				}
			}
			if(px){
				value = value + px;
			}
			var params = {};
			params[styleAttr] = value;
			actions.setStyle(store,this.checkedItems[0], params,true)
			this.style = utils.getStyle(this.checkedItems[0],'all',true);
		},
		setBoxShadow: function(ev,type,px){
			var styleAttr = $(ev.target).parents('li[style-attr]').attr('style-attr');
			var value;
			if(type === 'checked'){
				value = $(ev.target)[0].checked ? 'inset' : '';
			}else{
				value = $(ev.target).val();
			}
			if(type === 'color'){
				if(value.indexOf('#') > -1 && value.length !== 7){
					return;
				}
				if(!utils.checkIsColor(value)){
					return;
				}
			}
			if(px){
				value = value + px;
			}
			this.boxShadowStyle[styleAttr] = value;
			var boxShadowValue = this.boxShadowStyle['box-shadow-x'] + ' ' + this.boxShadowStyle['box-shadow-y'] + ' ' + this.boxShadowStyle['box-shadow-blur'] + ' ' + this.boxShadowStyle['box-shadow-size'] + ' ' + this.boxShadowStyle['box-shadow-color'] + ' ' + this.boxShadowStyle['box-shadow-place'];
			actions.setStyle(store,this.checkedItems[0], {
				'box-shadow': boxShadowValue
			},true)
		},
		formatBoxShadow: function(boxShadowStr){
			var result = {};
			var _arr = boxShadowStr.replace(/(^\s+)|(\s+$)/g,'').split(' ');
			result['box-shadow-x'] = _arr[0];
			result['box-shadow-y'] = _arr[1];
			result['box-shadow-blur'] = _arr[2];
			result['box-shadow-size'] = _arr[3];
			result['box-shadow-color'] = _arr[4];
			result['box-shadow-place'] = _arr[5] ? _arr[5] : '';
			return result;
		},
		addAni: function(){
			actions.addClass(store,this.checkedItems[0],'ani');
			var model = 'none 0s ease 0s 1 none';
			var _aniStr = utils.getStyle(this.checkedItems[0],'-webkit-animation',true) || utils.getStyle(this.checkedItems[0],'animation',true);
			if(_aniStr !== null){
				actions.setStyle(store,this.checkedItems[0],{
					'animation': _aniStr + ',' + model,
					'-webkit-animation': _aniStr + ',' + model
				},true);
			}else{
				actions.setStyle(store,this.checkedItems[0],{
					'animation': model,
					'-webkit-animation': model
				},true);
			}
			var aniStr = utils.getStyle(this.checkedItems[0],'-webkit-animation',true) || utils.getStyle(this.checkedItems[0],'animation',true);
			this.aniStyleAttr = this.formatAni(aniStr);
		},
		delAni: function(index){
			var result = [];
			this.aniStyleAttr = result.concat(this.aniStyleAttr.slice(0,index),this.aniStyleAttr.slice(index+1));
			var resultStr = [];
			for(var i = 0;i < this.aniStyleAttr.length;i++){
				resultStr.push(this.aniStyleAttr[i]['ani-name'] + ' ' + this.aniStyleAttr[i]['ani-duration'] + ' ' + this.aniStyleAttr[i]['ani-tween'] + ' ' + this.aniStyleAttr[i]['ani-delay'] + ' ' + this.aniStyleAttr[i]['ani-count'] + ' none');
			}
			if(resultStr.length === 0){
				actions.removeClass(store,this.checkedItems[0],'ani');
			}
			actions.setStyle(store,this.checkedItems[0],{
				'animation': resultStr.join(','),
				'-webkit-animation': resultStr.join(',')
			},true);
			this.group_index = this.group_index == 0 ? 0 : this.group_index - 1;
		},
		setAni: function(index,ev,type,px){
			var styleAttr = $(ev.target).parents('li[style-attr]').attr('style-attr');
			var value;
			if(type === 'checked'){
				value = $(ev.target)[0].checked ? 'infinite' : 1;
			}else{
				value = $(ev.target).val();
			}
			if(px){
				value = value + px;
			}
			this.aniStyleAttr[index][styleAttr] = value;
			var resultStr = [];
			for(var i = 0;i < this.aniStyleAttr.length;i++){
				resultStr.push(this.aniStyleAttr[i]['ani-name'] + ' ' + this.aniStyleAttr[i]['ani-duration'] + ' ' + this.aniStyleAttr[i]['ani-tween'] + ' ' + this.aniStyleAttr[i]['ani-delay'] + ' ' + this.aniStyleAttr[i]['ani-count'] + ' none');
			}
			actions.setStyle(store,this.checkedItems[0],{
				'animation': resultStr.join(','),
				'-webkit-animation': resultStr.join(',')
			},true);
		},
		formatAni: function(aniStr){
			var result = [];
			var _arr1 = aniStr.replace(/(^\s+)|(\s+$)/g,'').split(',');
			for(var i = 0;i < _arr1.length;i++){
				if(_arr1[i] != ''){
					_arr1[i] = _arr1[i].replace(/(^\s+)|(\s+$)/g,'');
					var _currentResult = {};
					var _arr2 = _arr1[i].split(' ');
					_currentResult['ani-name'] = _arr2[0];
					_currentResult['ani-duration'] = _arr2[1];
					_currentResult['ani-tween'] = _arr2[2];
					_currentResult['ani-delay'] = _arr2[3];
					_currentResult['ani-count'] = _arr2[4];
					_currentResult['ani-mode'] = _arr2[5];
					result.push(_currentResult);
				}
			}
			return result;
		},
		reloadAni: function(){
			var _this = this;
			var _AniStr = utils.getStyle(this.checkedItems[0],'-webkit-animation',true) || utils.getStyle(this.checkedItems[0],'animation',true);
			actions.setStyle(store,this.checkedItems[0],{
				'animation': '',
				'-webkit-animation': ''
			},true);
			$('.j_screen>div').eq(this.checkedItems[0])[0].style.width = $('.j_screen>div').eq(this.checkedItems[0])[0].style.width;
			setTimeout(function(){
				actions.setStyle(store,_this.checkedItems[0],{
					'animation': _AniStr,
					'-webkit-animation': _AniStr
				},true);
			}, 1);
		}
	},
	watch: {
		'checkedItems': {
			handler: function(value){
				var _this = this;
				if(this.checkedItems[0] !== undefined){
					this.itemType = $('.j_screen>div').eq(this.checkedItems[0]).attr('type');
					this.style = utils.getStyle(this.checkedItems[0],'all',true);
					this.boxShadowStyle = this.formatBoxShadow(utils.getStyle(this.checkedItems[0],'box-shadow',true));
					var aniStr = utils.getStyle(this.checkedItems[0],'-webkit-animation',true) || utils.getStyle(this.checkedItems[0],'animation',true);
					this.aniStyleAttr = aniStr === null ? [] : this.formatAni(aniStr);
				}
			},
			deep: true,
			immediate: true
		}
	}

})

module.exports = AttrList;

</script>
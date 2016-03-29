<template>
    <div class="tool_bar">
        <ul>
            <!-- <li v-tips="['right','撤销']"><div class="tool_btn tool_btn1">撤销</div></li> -->
            <!-- <li v-tips="['right','重做']"><div class="tool_btn tool_btn2">重做</div></li> -->
            <li v-tips="['right','背景']">
                <div class="tool_btn tool_btn3" @click="setBg()">背景</div>
                <ul class="bg_btn" v-show="dropDown" @click="dropDown = !dropDown">
                    <li @click="materialLibPic({show:true,msg:'更改背景',type:'bg'})">更换</li>
                    <li @click="delBg()">删除</li>
                </ul>
            </li>
            <li v-tips="['right','预览']" @click="reload()">
                <div class="tool_btn tool_btn4">预览</div>
            </li>
            <li @click="bgGridStatus = !bgGridStatus" v-tips="['right','网格']">
                <div class="tool_btn tool_btn5">网格</div>
            </li>
            <!-- <li><div class="tool_btn tool_btn6">音乐</div></li> -->
        </ul>
    </div>
</template>
<style>

.tool_bar{position: fixed;top: 100px;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);margin-left: 190px;z-index: 9998;}
.tool_bar>ul{}
.tool_bar>ul>li{color: #fff;width: 30px;height: 30px;cursor: pointer;text-align: center;line-height: 40px;display: block;background-color: rgba(0,0,0,0.5);transition: all ease 0.2s;-webkit-transition: all ease 0.2s;padding: 5px;position: relative;}
.tool_bar>ul>li:hover{background-color: rgba(0,0,0,0.8);}
.tool_btn{background-image: url('/back/dist/img/icon.png');text-indent: -9999px;background-repeat: no-repeat;width: 30px;height: 30px;}
.tool_btn1{background-position: -90px 0;}
.tool_btn2{background-position: -90px -30px;}
.tool_btn3{background-position: 0 -150px;}
.tool_btn4{background-position: -90px -270px;}
.tool_btn5{background-position: -90px -60px;}
.bg_btn{position: absolute;width: 80px;background-color: rgba(0,0,0,0.8);left: -80px;top: 0;}
.bg_btn>li{width: 100%;font-size: 14px;color: #fff;text-align: center;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.bg_btn>li:hover{background-color: #01d7b2}


</style>
<script>
var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var utils = require('utils');

var tips = require('../../directive/tips.js');

var ToolBar = Vue.extend({
    name: 'ToolBar',
    data: function() {
        return {
            dropDown: false
        }
    },
    props: ['bgGridStatus'],
    vuex: {
        getters: {
            currentPageMain: function() {
                return store.state.currentPageMain;
            }
        },
        actions: actions
    },
    methods: {
        materialLibPic: actions.materialLibPic,
        delBg: actions.delPage,
        setBg: function() {
            if (!utils.checkIsColor(this.currentPageMain.background)) {
                this.dropDown = !this.dropDown;
            } else {
                actions.materialLibPic(store, {
                    show: true,
                    msg: '更改背景',
                    type: 'bg'
                })
            }
        },
        reload: function() {
            $('.j_screen').fadeOut('fast');
            $('.j_screen').fadeIn('fast');
        },
    }
})

module.exports = ToolBar;
</script>
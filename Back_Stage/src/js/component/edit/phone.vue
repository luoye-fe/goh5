<template>
    <div class="phone_con">
        <div class="phone_title">{{workData.title}}</div>
        <div class="phone_screen j_screen" :style="currentPageMain.background | FormatBg" :class="{'grid_bg': bgGridStatus}"  v-drag-item v-keyboard>
            <div v-for="item in currentPageData.items" track-by="$index" :id="item.id" :class="item.class" :style="item.style" :title="'ID : '+item.id" :attr="item.attr | json" :type="item.type" :index="$index" @mousedown="selectItemOp($index, $event);" v-change-size v-edit-text-item v-context-menu="'#item_context_menu'">
                <div class="content">{{{item.content}}}</div>
                <div class="edit_mode_cont" v-show="checkedItems.indexOf($index) != -1">
                    <div class="edit_mode_layer">
                        <div class="edit_mode edit_mode_radius_t_l"></div>
                        <div class="edit_mode edit_mode_radius_t_m"></div>
                        <div class="edit_mode edit_mode_radius_t_r"></div>
                        <div class="edit_mode edit_mode_radius_m_r"></div>
                        <div class="edit_mode edit_mode_radius_b_r"></div>
                        <div class="edit_mode edit_mode_radius_b_m"></div>
                        <div class="edit_mode edit_mode_radius_b_l"></div>
                        <div class="edit_mode edit_mode_radius_m_l"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ul id="item_context_menu" class="context_menu" style="display: none;">
        <li @click="delItem()">删除</li>
    </ul>
</template>

<style>

.phone_con{position: relative;margin: 90px auto 0;background-size: 100%;background-image: url(/back/dist/img/phone.svg);background-repeat: no-repeat;width: 326px;height: 620px;}
.phone_con .phone_title{position: absolute;top: 65px;width: 80%;left: 10%;text-align: center;color: #fff;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;height: 20px;font-size: 18px;}
.phone_con .phone_screen{width: 320px;height: 486px;position: absolute;top: 97px;left: 3px;background-size: cover;background-repeat: no-repeat;}
.phone_con .phone_screen>div{cursor: pointer;}
.phone_con .phone_screen>div .content{position: relative;width: 100%;height: 100%;}
.phone_screen.grid_bg:after {display: block;width: 100%;height: 100%;content: " ";background-image: url(/back/dist/img/grid_bg.png);background-size: 320px 486px;opacity: 0.5;}
.content p, .content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {display: inline;font-weight: normal;}
.content h1 {font-size: 2em;}
.content h2 {font-size: 1.5em;}
.content h3 {font-size: 1.17em;}
.content h4 {font-size: 1em;}
.content h5 {font-size: 0.83em;}
.content h6 {font-size: 0.67em;}
.edit_mode_cont {position: absolute;left: 0;top: 0;right: 0;bottom: 0;z-index: -1;-webkit-user-select: none;-webkit-user-drag: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);border: 1px dashed #585858;}
.edit_mode_layer {position: relative;z-index: 800;-webkit-user-select: none;-webkit-user-drag: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);width: 100%;height: 100%;}
.edit_mode_layer>div{position: absolute;;width: 10px;height: 10px;background: #fff;border: 1px solid #585858;z-index: 888;box-sizing: border-box;}
.edit_mode_radius_t_l{cursor: nw-resize;left: -8px;top: -8px;border-radius: 50%;}
.edit_mode_radius_t_m{cursor: n-resize;left: 50%;margin-left: -6px;top: -8px;}
.edit_mode_radius_t_r{cursor: ne-resize;right: -8px;top: -8px;border-radius: 50%;}
.edit_mode_radius_m_r{cursor: e-resize;top: 50%;margin-top: -6px;right: -8px;}
.edit_mode_radius_b_r{cursor: se-resize;right: -8px;bottom: -8px;border-radius: 50%;}
.edit_mode_radius_b_m{cursor: s-resize;left: 50%;margin-left: -6px;bottom: -8px;}
.edit_mode_radius_b_l{cursor: sw-resize;bottom: -8px;left: -8px;border-radius: 50%;}
.edit_mode_radius_m_l{cursor: e-resize;top: 50%;margin-top: -6px;left: -8px;}

</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var dragItem = require('../../directive/dragItem.js');
var changeSize = require('../../directive/changeSize.js');
var contextMenu = require('../../directive/contextMenu.js');
var editTextItem = require('../../directive/editTextItem.js');
var keyboard = require('../../directive/keyboard.js');

var PhoneVm = null;
var Phone = Vue.extend({
    name: 'Phone',
    data: function(){
        return {

        }
    },
    props: ['bgGridStatus'],
    vuex: {
        getters: {
            workData: function(){
                return store.state.workData;
            },
            currentPageData: function(){
                return store.state.currentPageData;
            },
            currentPageMain: function(){
                return store.state.currentPageMain;
            },
            checkedItems: function(){
                return store.state.checkedItems;
            }
        },
        actions: actions
    },
    init: function(){
        PhoneVm = this;
    },
    ready: function(){
        // 点击其它地方隐藏元素属性
        $(document).bind('click',function(ev){
            var obj = $(ev.target);
            if (obj.parents('.j_screen').length === 0 && obj.parents('.pages_con').length === 0 && obj.parents('.side_con').length === 0 && obj.parents('.tool_bar').length === 0 && obj.parents('.popline').length === 0 && obj.parents('.head_con').length === 0 && obj.parents('.context_menu').length === 0 && obj.parents('li').find('.group_head').length === 0) {
                actions.clearCheckedItems(store);
            }
        })
    },
    methods: {
        selectItemOp: function(index, ev){
            // 防止多选移动的时候触发选中元素
            if(this.checkedItems.length > 1 && !ev.shiftKey && !ev.ctrlKey){
                return;
            }
            if(ev.shiftKey || ev.ctrlKey){
               actions.selectItem(store, index, true); 
            }else{
                actions.selectItem(store, index);
            }
        },
        delItem: actions.delItem
    }
})

module.exports = Phone;

</script>
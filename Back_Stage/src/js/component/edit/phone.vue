<template>
    <div class="phone_con">
        <div class="phone_title">{{workData.title}}</div>
        <div class="phone_screen">
            <div v-for="item in currentPageData.items" track-by="$index" :id="item.id" :class="item.class" :style="item.style" :title="item.id" :attr="item.attr | json" :type="item.type">
                <div class="content">{{{item.content}}}</div>
                <div class="edit_mode_layer"></div>
                <div class="edit_mode edit_mode_radius_t_l"></div>
                <div class="edit_mode edit_mode_radius_t_m"></div>
                <div class="edit_mode edit_mode_radius_t_r"></div>
                <div class="edit_mode edit_mode_radius_m_l"></div>
                <div class="edit_mode edit_mode_radius_m_r"></div>
                <div class="edit_mode edit_mode_radius_b_l"></div>
                <div class="edit_mode edit_mode_radius_b_m"></div>
                <div class="edit_mode edit_mode_radius_b_r"></div>
            </div>
        </div>
    </div>
</template>

<style>

.phone_con{position: relative;margin: 90px auto 0;background-size: 100%;background-image: url(/dist/img/phone.svg);background-repeat: no-repeat;width: 326px;height: 620px;}
.phone_con .phone_title{position: absolute;top: 65px;width: 80%;left: 10%;text-align: center;color: #fff;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;height: 20px;font-size: 18px;}
.phone_con .phone_screen{width: 320px;height: 486px;position: absolute;top: 97px;left: 3px;}
.phone_con .phone_screen>div{position: absolute;cursor: pointer;}

.nr p, .nr h1, .nr h2, .nr h3, .nr h4, .nr h5, .nr h6 {display: inline;font-weight: normal;}
.nr h1 {font-size: 2em;}
.nr h2 {font-size: 1.5em;}
.nr h3 {font-size: 1.17em;}
.nr h4 {font-size: 1em;}
.nr h5 {font-size: 0.83em;}
.nr h6 {font-size: 0.67em;}

.edit_mode_layer {position: absolute;left: 0;top: 0;right: 0;bottom: 0;z-index: -1;-webkit-user-select: none;-webkit-user-drag: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);border: 1px dashed #585858;}

.edit_mode{position: absolute;;width: 9px;height: 9px;background: #fff;border: 1px solid #585858;z-index: 9999;box-sizing: border-box;}
.edit_mode_radius_t_l {cursor: nw-resize;left: -5px;top: -5px;border-radius: 50%;}
.edit_mode_radius_t_m {cursor: n-resize;left: 50%;margin-left: -5px;top: -5px;}
.edit_mode_radius_t_r {cursor: ne-resize;right: -5px;top: -5px;border-radius: 50%;}
.edit_mode_radius_m_l {cursor: e-resize;top: 50%;margin-top: -5px;left: -5px;}
.edit_mode_radius_m_r {cursor: e-resize;top: 50%;margin-top: -5px;right: -5px;}
.edit_mode_radius_b_l {cursor: sw-resize;bottom: -5px;left: -5px;border-radius: 50%;}
.edit_mode_radius_b_m {cursor: s-resize;left: 50%;margin-left: -5px;bottom: -5px;}
.edit_mode_radius_b_r {cursor: se-resize;right: -5px;bottom: -5px;border-radius: 50%;}
    
</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../../store/index.js');
var actions = require('../../store/actions.js');


var Phone = Vue.extend({
    name: 'Phone',
    data: function(){
        return {

        }
    },
    vuex: {
        getters: {
            workData: function(){
                return store.state.workData;
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

    }
})

module.exports = Phone;

</script>
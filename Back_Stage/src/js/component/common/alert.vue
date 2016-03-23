<template>
    <div class="alert" v-show="alertObj.show" :class="alertObj.type" transition="fade">
        <h4>{{alertObj.msg}}</h4>
    </div>
</template>
<style>
.alert {padding:15px 40px;border: 1px solid transparent;border-radius: 4px;position: fixed;left: 50%;top: 100px;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);z-index: 999999;box-shadow: 0 5px 15px rgba(0,0,0,0.7)}
.alert h4 {margin-top: 0;color: inherit;font-size: 18px;}
.alert .alert-link {font-weight: bold;}
.alert.dismissable .close,.alert.dismissible .close {position: relative;top: -2px;right: -21px;color: inherit;}
.alert.success {color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;}
.alert.success hr {border-top-color: #c9e2b3;}
.alert.info {color: #31708f;background-color: #d9edf7;border-color: #bce8f1;}
.alert.warning {color: #8a6d3b;background-color: #fcf8e3;border-color: #faebcc;}
.alert.danger {color: #a94442;background-color: #f2dede;border-color: #ebccd1;}
</style>
<script>
var Vue = require('Vue');
var $ = require('jQuery');

var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');

var Alert = Vue.extend({
    name: 'Alert',
    vuex: {
        getters: {
            alertObj: function() {
                return store.state.alertObj;
            }
        },
        actions: actions
    }
})

Vue.component('m-alert', Alert);

module.exports = Alert;
</script>
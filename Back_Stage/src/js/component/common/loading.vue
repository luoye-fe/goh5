<template>
	<div class="loading_con" v-show="loading">
	    <div class="all_center loading_center">
	        <div class="all_center">
	            <img src="/back/dist/img/loading.png">
	            <span>加载中</span>
	        </div>
	    </div>
	</div>
</template>

<style>	
.loading_con {position: fixed;top: 0;left: 0;width: 100%;height:100%;background: rgba(0, 0, 0, 0.4);z-index: 9999999;}
.loading_con .loading_center{width: 150px;height: 150px;border-radius: 20px;background: #fff;}
.loading_con .loading_center>div img{display: block;margin: 0 auto;-webkit-animation:loading linear both 1s infinite;}
.loading_con .loading_center>div span{display: block;margin: 15px auto 0;text-align: center;font-size: 16px;}
@-webkit-keyframes loading {
    from {   
        -webkit-transform: rotate(0deg);
    }
    to {    
        -webkit-transform: rotate(360deg);
    }
}	
</style>

<script>
	
var Vue = require('Vue');
var Loading = Vue.extend({
	name: 'Loading',
	data: function(){
		return {}
	},
	props: ['loading']
})

Vue.component('m-loading', Loading);

module.exports = Loading;

</script>
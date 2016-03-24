'use strict';

var Swiper = require('Swiper');
var utils = require('utils');
var ani = require('./animate.js');

var defaultConfig = window.defaultConfig;

var isInited = false; // swiper的bug，不是初始页的时候会出发slidechangeend事件
var setConfig = {
    direction: defaultConfig.direction,
    loop: defaultConfig.loop,
    onInit: function(swiper){
    	ani.swiperAnimateCache(function(){
	    	ani.swiperAnimate(swiper);
	    	isInited = true;
    	});
    },
    onSlideChangeEnd: function(swiper){
    	if(isInited){
    		ani.swiperAnimate(swiper);    		
    	}
    }
};

// 初始页面
setConfig.initialSlide = defaultConfig.autoBackPrePage ? (utils.getCookie('initialSlide') ? (setConfig.loop ? Number(utils.getCookie('initialSlide')) - 1 : Number(utils.getCookie('initialSlide'))) : 0) : 0;

var GoH5 = new Swiper('.swiper-container', setConfig);
GoH5.on('slideChangeEnd', function(swiper) {
	if(defaultConfig.autoBackPrePage){
	    utils.setCookie('initialSlide', swiper.activeIndex, 2);
	}
})


// for debug
window.GoH5 = GoH5;
window.$ = utils.$;


module.exports = GoH5;
'use strict';


var setConfig = {};



var GoH5 = new Swiper('.swiper-container', {
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    direction: 'vertical',
    loop: true
});

GoH5.on('slideChangeEnd',function(swiper){
	console.log(swiper);
})

module.exports = GoH5;
'use strict';

var $ = require('./jquery.js');

var swiperAnimateCache = function(cb) {
    var cacheLen = 0;
    $('.ani').each(function(index, item) {
        if ($(item).children().eq(0).attr('isCached') === undefined) {
            cacheLen++;
            var ani = $(item).children().eq(0)[0].style['animation'] || $(item).children().eq(0)[0].style['-webkit-animation'];
            var aniCache = ani.replace(/none|forwards|backwords/, 'both').replace(/none|forwards|backwords/g, 'forwards');
            $(item).children().eq(0).attr('aniCache', aniCache);
            $(item).children().eq(0).attr('isCached', true);
            $(item).children().eq(0).css('visibility','hidden');
            if ($('.ani').length === cacheLen) {
                cb && cb();
            }
        }
    })
}

var swiperAnimate = function(swiper) {
    clearSwiperAnimate();
    var aniEle = swiper.slides[swiper.activeIndex].querySelectorAll(".ani");
    for (var i = 0; i < aniEle.length; i++) {
        var aniCache = $(aniEle[i]).children().eq(0).attr('aniCache');
        $(aniEle[i]).children().eq(0).css('visibility','visible');
        $(aniEle[i]).children().eq(0).css('animation', aniCache);
        $(aniEle[i]).children().eq(0).css('-webkit-animation', aniCache);
    }
}

var clearSwiperAnimate = function() {
    $('.ani').each(function(index, item) {
        $(item).children().eq(0).css('animation', '');
        $(item).children().eq(0).css('-webkit-animation', '');
        $(item).children().eq(0).css('visibility','hidden');
    })
}

module.exports = {
    swiperAnimateCache: swiperAnimateCache,
    swiperAnimate: swiperAnimate
}
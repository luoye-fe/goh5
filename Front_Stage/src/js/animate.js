'use strict';

var utils = require('utils');

var swiperAnimateCache = function(cb) {
    var cacheLen = 0;
    utils.$('.ani').each(function(index, item) {
        if (utils.$(item).children().eq(0).attr('isCached') === null) {
            cacheLen++;
            var ani = utils.$(item).children().eq(0)[0].style['animation'] || utils.$(item).children().eq(0)[0].style['-webkit-animation'];
            var aniCache = ani.replace(/none|forwards|backwords/, 'both').replace(/none|forwards|backwords/g, 'forwards');
            utils.$(item).children().eq(0).attr('aniCache', aniCache);
            utils.$(item).children().eq(0).attr('isCached', true);
            utils.$(item).children().eq(0).css('visibility','hidden');
            if (utils.$('.ani').length === cacheLen) {
                cb && cb();
            }
        }
    })
}

var swiperAnimate = function(swiper) {
    clearSwiperAnimate();
    var aniEle = swiper.slides[swiper.activeIndex].querySelectorAll(".ani");
    for (var i = 0; i < aniEle.length; i++) {
        var aniCache = utils.$(aniEle[i]).children().eq(0).attr('aniCache');
        utils.$(aniEle[i]).children().eq(0).css('visibility','visible');
        utils.$(aniEle[i]).children().eq(0).css('animation', aniCache);
        utils.$(aniEle[i]).children().eq(0).css('-webkit-animation', aniCache);
    }
}

var clearSwiperAnimate = function() {
    utils.$('.ani').each(function(index, item) {
        utils.$(item).children().eq(0).css('animation', '');
        utils.$(item).children().eq(0).css('-webkit-animation', '');
        utils.$(item).children().eq(0).css('visibility','hidden');
    })
}

module.exports = {
    swiperAnimateCache: swiperAnimateCache,
    swiperAnimate: swiperAnimate
}
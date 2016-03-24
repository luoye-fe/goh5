'use strict';
var utils = require('utils');
var Event = require('Event');

var loadImg = function(src, callback) {
    var Tag = document.createElement('img');
    Tag.style.display = 'none';
    Tag.src = src;
    document.body.appendChild(Tag);
    Tag.onload = Tag.onerror = function() {
        document.body.removeChild(Tag);
        if (callback) {
            callback && callback();
        }
    };
}

var imgArr = [];
utils.$('[data-src]').each(function(index, item) {
    imgArr.push(utils.$(item).attr('data-src'));
})
imgArr = utils.unduplicate(imgArr);

var loadedImgLen = 0;
imgArr.forEach(function(item) {
    loadImg(item, function() {
        loadedImgLen++;
        Event.trigger('loading', (loadedImgLen / imgArr.length * 100).toFixed(0) + '%');
        utils.$('.loading_con em').html((loadedImgLen / imgArr.length * 100).toFixed(0) + '%');
        if (loadedImgLen === imgArr.length) {
            utils.$('[data-src]').each(function(index, item) {
                utils.$(item).attr('src', utils.$(item).attr('data-src'));
            })
            Event.trigger('loaded');
            utils.$('.loading_con').addClass('fedeOut');
            setTimeout(function() {
                utils.$('.loading_con').css('display', 'none');
            }, 400);
        }
    });
})
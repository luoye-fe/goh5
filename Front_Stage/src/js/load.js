'use strict';
var utils = require('utils');
var Event = require('Event');
var $ = require('./jquery.js');

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
$('[data-src]').each(function(index, item) {
    imgArr.push($(item).attr('data-src'));
})
imgArr = utils.unduplicate(imgArr);
var loadedImgLen = 0;
imgArr.forEach(function(item) {
    loadImg(item, function() {
        loadedImgLen++;
        Event.trigger('loading', (loadedImgLen / imgArr.length * 100).toFixed(0) + '%');
        $('.loading_con em').html((loadedImgLen / imgArr.length * 100).toFixed(0) + '%');
        if (loadedImgLen === imgArr.length) {
            $('[data-src]').each(function(index, item) {
                $(item).attr('src', $(item).attr('data-src'));
            })
            Event.trigger('loaded');
            $('.loading_con').addClass('fedeOut');
            setTimeout(function() {
                $('.loading_con').css('display', 'none');
            }, 400);
        }
    });
})

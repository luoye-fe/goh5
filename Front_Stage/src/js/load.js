'use strict';
var GoH5 = require('./goh5.js');
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

var loadedImgLen = 0;
utils.$('[data-src]').each(function(index, item) {
    loadImg(utils.$(item).attr('data-src'), function() {
        loadedImgLen++;
        Event.trigger('loading', (loadedImgLen / utils.$('[data-src]').length * 100).toFixed(0) + '%');
        utils.$('.loading_con em').html((loadedImgLen / utils.$('[data-src]').length * 100).toFixed(0) + '%');
        utils.$(item).attr('src', utils.$(item).attr('data-src'));
        if (loadedImgLen === utils.$('[data-src]').length) {
            Event.trigger('loaded');
            utils.$('.loading_con').addClass('fedeOut');
            setTimeout(function() {
                utils.$('.loading_con').css('display', 'none');
            }, 400);
        }
    });
})
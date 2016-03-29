'use strict';
var utils = require('utils');
// 音乐
var ctrlMusic = {
    el: utils.$('#audio_ele'),
    btnel: utils.$('.audio_btn'),
    _init: function() {
    	var _this = this;
        if (this.el.attr('src') !== '') {
        	this.btnel.css('display','block');
        	this.btnel.on('click',function(){
        		if(_this.btnel.hasClass('play')){
        			_this.btnel.removeClass('play');
					_this.el[0].pause();
        		}else{
        			_this.btnel.addClass('play');
					_this.el[0].play();
        		}
        	})
        }
    },
    pause: function(){
    	this.el[0].pause();
    },
    play: function(){
    	this.el[0].play();
    }
}

ctrlMusic._init();
module.exports = ctrlMusic;
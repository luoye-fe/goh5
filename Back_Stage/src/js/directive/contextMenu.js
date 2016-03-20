'use strict';

var Vue = require('Vue');
var $ = require('jQuery');

Vue.directive('contextMenu', function(eleId) {
    var target = this.el;
    $(window).bind('click', function(ev) {
        var obj = $(ev.target);
        if (obj.parents(eleId).length === 0) {
            $(eleId).fadeOut('fast');
        }
    })
    $(target).bind('contextmenu', function(ev) {
        ev.preventDefault();
        var obj = $(eleId);
        var clientX = ev.clientX;
        var clientY = ev.clientY;
        obj.css({
            left: clientX + 10 + 'px',
            top: clientY + 10 + 'px',
            display: 'block'
        })
        $(eleId).bind('mouseleave', function() {
            $(eleId).fadeOut('fast');
        })
        $(eleId).bind('click', function() {
            $(eleId).fadeOut('fast');
        })
        return false;
    })
})

'use strict';
var Vue = require('Vue');
var $ = require('jQuery');

function createTips(direction, msg) {
    var oDiv = document.createElement('div');
    oDiv.className = 'awesomeTips';
    oDiv.innerHTML = msg;
    var triangle = createTriangle(direction);
    oDiv.appendChild(triangle);
    return oDiv;
}

function createTriangle(direction) {
    var oDiv = document.createElement('div');
    oDiv.style.cssText = 'position:absolute;'
    switch (direction) {
        case 'left':
            oDiv.style.cssText += 'border-top:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid rgba(0,0,0,0.7);left:100%;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);';
            break;
        case 'top':
            oDiv.style.cssText += 'border-top:5px solid rgba(0,0,0,0.7);border-right:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid transparent;top:100%;left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);';;
            break;
        case 'right':
            oDiv.style.cssText += 'border-top:5px solid transparent;border-right:5px solid rgba(0,0,0,0.7);border-bottom:5px solid transparent;border-left:5px solid transparent;right:100%;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);';
            break;
        case 'bottom':
            oDiv.style.cssText += 'border-top:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid rgba(0,0,0,0.7);border-left:5px solid transparent;bottom:100%;left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);';;
            break;
    }
    return oDiv;
}

Vue.directive('tips', function(params) {
    var target = this.el;
    var direction = params[0];
    var msg = params[1];
    $(target).on('mouseenter', function() {
        var _this = $(this);
        var oDiv = $(createTips(direction, msg));
        $('body').append(oDiv);
        var offsetInfo = _this.offset();
        var W = _this.outerWidth();
        var H = _this.outerHeight();
        var _W = oDiv.outerWidth();
        var _H = oDiv.outerHeight();
        oDiv.css({ 'display': 'block' });
        switch (direction) {
            case 'left':
                oDiv.css({
                    'left': offsetInfo.left - _W - 10 + 'px',
                    'top': offsetInfo.top + (H / 2) - (_H / 2) + 'px'
                });
                oDiv.addClass('tipsInLeft');
                oDiv.removeClass('tipsOutLeft');
                break;
            case 'top':
                oDiv.css({
                    'left': offsetInfo.left + (W / 2) - (_W / 2) + 'px',
                    'top': offsetInfo.top - _H - 10 + 'px'
                });
                oDiv.addClass('tipsInTop');
                oDiv.removeClass('tipsOutTop');
                break;
            case 'right':
                oDiv.css({
                    'left': offsetInfo.left + W + 10 + 'px',
                    'top': offsetInfo.top + (H / 2) - (_H / 2) + 'px'
                });
                oDiv.addClass('tipsInRight');
                oDiv.removeClass('tipsOutRight');
                break;
            case 'bottom':
                oDiv.css({
                    'left': offsetInfo.left + (W / 2) - (_W / 2) + 'px',
                    'top': offsetInfo.top + H + 10 + 'px',
                });
                oDiv.addClass('tipsInBottom');
                oDiv.removeClass('tipsOutBottom');
                break;
        }
    })
    $(target).on('mouseleave', function() {
        var _this = $(this);
        var oDiv = $('body').find('.awesomeTips');
        switch (direction) {
            case 'left':
                oDiv.removeClass('tipsInLeft');
                oDiv.addClass('tipsOutLeft');
                break;
            case 'top':
                oDiv.removeClass('tipsInTop');
                oDiv.addClass('tipsOutTop');
                break;
            case 'right':
                oDiv.removeClass('tipsInRight');
                oDiv.addClass('tipsOutRight');
                break;
            case 'bottom':
                oDiv.removeClass('tipsInBottom');
                oDiv.addClass('tipsOutBottom');
                break;
        }
        setTimeout(function() {
            oDiv.remove();
        }, 600);

    })
})

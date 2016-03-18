'use strict';
// 必需两个参数 index:当前页元素个数，为了层级
//             num:所有元素个数，为了id
module.exports = {
    txt: function(index, num ,className) {
        return {
            type: 'txt',
            style: 'z-index:' + index + ';width:32%;top:0%;left:0%;font-size:1em;box-sizing:border-box;position: absolute;',
            class: className ? className : '',
            id: 'n_' + num,
            attr: {},
            content: '<p style="display:block;box-sizing:border-box;-webkit-animation: none 0s ease 0s 1 none;animation: none 0s ease 0s 1 none;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);color:#1a1a1a;line-height:1.5;padding:5px;">文本文本文本</p>'
        };
    },
    pic: function(index, num, src) {
        return {
            type: 'pic',
            style: 'z-index:' + index + ';width:50%;top:0%;left:0%;box-sizing:border-box;position: absolute;',
            class: '',
            id: 'n_' + num,
            attr: {},
            content: '<img style="width:100%;height:100%;box-sizing:border-box;display:block;-webkit-animation: none 0s ease 0s 1 none;animation: none 0s ease 0s 1 none;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);" src="' + src + '">'
        };
    },
    video: function(index, num, videoid, pic_url) {
        return {
            type: 'video',
            style: 'z-index:' + index + ';height:37.5%;width:100%;top:0%;left:0%;box-sizing:border-box;position: absolute;',
            class: '',
            id: 'n_' + num,
            attr: {},
            content: '<video style="width:100%;height:100%;box-sizing:border-box;-webkit-animation: none 0s ease 0s 1 none;animation: none 0s ease 0s 1 none;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);" data-vid="' + videoid + '" poster="' + pic_url + '" controls="controls" preload="none" src="http://video.proc.sina.cn/video_explore/location.php?video_id=' + videoid + '">您的浏览器不支持video标签。</video>'
        };
    }
};

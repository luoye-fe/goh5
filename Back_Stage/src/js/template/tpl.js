'use strict';
// 必需两个参数 index:当前页元素个数，为了层级
//             num:所有元素个数，为了id
module.exports = {
    txt: function(index, num, params) {
        return {
            type: 'txt',
            style: 'z-index:' + index * 10 + ';width:100px;top:0px;left:0px;font-size:1em;box-sizing:border-box;position: absolute;',
            class: params.className ? params.className : '',
            id: 'n_' + num,
            attr: {},
            content: '<div style="display:block;width:100%;height:100%;box-sizing:border-box;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);color:#1a1a1a;line-height:1.5;padding:5px;">文本文本文本</div>'
        };
    },
    pic: function(index, num, params) {
        return {
            type: 'pic',
            style: 'z-index:' + index * 10 + ';max-width:320px;top:0px;left:0px;box-sizing:border-box;position: absolute;',
            class: params.className ? params.className : '',
            id: 'n_' + num,
            attr: {},
            content: '<img style="width:100%;height:100%;box-sizing:border-box;display:block;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);" src="' + params.src + '">'
        };
    },
    video: function(index, num, params) {
        return {
            type: 'video',
            style: 'z-index:' + index * 10 + ';width:320px;top:0px;left:0px;box-sizing:border-box;position: absolute;',
            class: params.className ? params.className : '',
            id: 'n_' + num,
            attr: {},
            content: '<video style="width:100%;height:100%;box-sizing:border-box;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);" data-vid="' + videoid + '" poster="' + pic_url + '" controls="controls" preload="none" src="http://video.proc.sina.cn/video_explore/location.php?video_id=' + videoid + '">您的浏览器不支持video标签。</video>'
        };
    }
};

'use strict';
// 必需两个参数 index:当前页元素个数，为了层级
//             num:所有元素个数，为了id
module.exports = {
    txt: function(index, num ,className) {
        return {
            type: 'txt',
            style: 'width:28%;top:0%;left:0%;z-index:' + index + ';color:#1a1a1a;line-height:1.5;padding:1%;font-size:1em;',
            class: className ? className : '',
            id: 'n_' + num,
            attr: {},
            content: '<p style="display:block;">文本文本文本</p>'
        };
    },
    pic: function(index, num, src, height, width) {
        return {
            type: 'pic',
            style: 'height:' + height + ';width:' + width + ';top:0%;left:0%;z-index:' + index + ';',
            class: '',
            id: 'n_' + num,
            attr: {},
            content: '<img style="width:100%;height:100%;" src="' + src + '">'
        };
    },
    video: function(index, num, videoid, pic_url) {
        return {
            type: 'video',
            style: 'height:37.5%;width:100%;top:0%;left:0%;z-index:' + index + ';',
            class: '',
            id: 'n_' + num,
            attr: {},
            content: '<video style="width:100%;height:100%" data-vid="' + videoid + '" poster="' + pic_url + '" controls="controls" preload="none" src="http://video.proc.sina.cn/video_explore/location.php?video_id=' + videoid + '">您的浏览器不支持video标签。</video>'
        };
    }
};

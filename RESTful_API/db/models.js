'use strict';

module.exports = {
    user: {
        user_name: { type: String, required: true },
        password: { type: String, required: true }
    },
    work: {
        'user_name': { type: String, required: true },
        'title': { type: String, required: true },
        'createTime': { type: Number, required: true },
        'lastSaveTime': { type: Number, required: true },
        'about': { type: Object, required: true },
        'mainCode': { type: Object, required: true }, // 主要内容
        'setConfig': { type: Object, required: true }, // 设置信息
        'saveRecord': { type: Object, required: true }, // 保存记录的数组
        'status': { type: Number, required: true } // 0:草稿 1:发布
    },
    uploadImg: {
        'user_name': { type: String, required: true },
        'file_name': { type: String, required: true },
        'upload_time': { type: Number, require: true }
    },
    uploadMusic: {
        'user_name': { type: String, required: true },
        'file_path': { type: String, required: true },
        'file_name': { type: String, required: true },
        'file_size': { type: String, required: true },
        'upload_time': { type: Number, require: true },
        'file_duration': { type: Number },
    }
}

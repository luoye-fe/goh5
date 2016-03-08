'use strict';

module.exports = {
    user: {
        user_name: { type: String, required: true },
        password: { type: String, required: true }
    },
    work: {
        'user': { type: String, required: true },
        'createTime': { type: Number, required: true },
        'lastSaveTime': { type: Number, required: true },
        'setConfig': { type: Object, required: true },
        'mainCode': { type: Object, required: true },
        'saveRecord': { type: Object, required: true }, // 保存记录的数组
        'status': { type: Number, required: true } // 0:草稿 1:发布
    }
}

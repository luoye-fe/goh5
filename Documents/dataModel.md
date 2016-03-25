数据模型
==============

```json
// 作品默认
{
    "user_name" : "luoye",
    "title" : "123123",
    "createTime" : 1458567406642,
    "lastSaveTime" : 1458823839756,
    "about" : {
        "desc" : "asdfsghaasdasdasdasd",
        "keyWords" : "qwerth",
        "thumbnail" : "/img/IJp8dNlnslB8Ptveh8bzcEGV.jpg"
    },
    "mainCode" : {  // 主要信息
        "wholeAttr" : {  // 主体属性
            "background" : "#fff",
            "bgmusic" : ""
        },
        "pages" : [  // 页面合集
            {
                "main" : {  // 当前页面的属性
                    "background" : "#fff",
                    "type" : "",
                    "height" : 486
                },
                "items" : [  //元素合集
                    {
                        "type" : "txt",
                        "style" : "z-index:2;width:46.9%;top:24.2%;left:14.1%;font-size:1em;box-sizing:border-box;position:absolute;height:8.8%;",
                        "class" : "ani",
                        "id" : "n_2",
                        "content" : "<div style=\"display:block;width:100%;height:100%;box-sizing:border-box;background-color:rgba(0,0,0,0);box-shadow:0px 0px 0px 0px rgba(0,0,0,0);color:#1a1a1a;line-height:1.5;padding:5px;animation:rotateIn 2s ease 0s 1 none;-webkit-animation:rotateIn 2s ease 0s 1 none;\">文本文本文本</div>"
                    }
                ]
            }
        ]
    },
    "setConfig" : {  // 设置信息
        "loop" : "true",
        "direction" : "vertical",
        "effect" : "slide",
        "autoBackPrePage" : "true"
    },
    "status" : 1,  // 作品状态 0:草稿  1:发布
}
```
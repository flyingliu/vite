define("plugin/comments", ["jquery", "template", 'proxy', 'config'], function ($, template, proxy, config) {
    var hotspotArr = [];
    var hotComment;
    var hotspot;
    var flag = false;
    var currentHotspot;
    var porxy;
    var panoId;
    var i;
    var elementTo = undefined;
    var TEMPLATE = '<div class="comment move">\
						<div class="comment_bg movetitle">\
							<div class="comment_pic">\
								<img src="<%=avatar%>">\
							</div>\
							<div class="comment_content"><%=content%></div>\
						</div>\
						<i class="comment_line"></i>\
					</div>';

    var temp = '<div class="comment_form">\
					<div class="comment_form_centent">\
						<textarea maxlength="14" class="comment_form_content" placeholder="随便说点什么吧"></textarea>\
					</div>\
					<div class="comment_form_bottom">\
						<button class="comment_form_btn comment_form_submit" type="submit">贴上</button>\
						<button class="comment_form_btn comment_form_cancel" type="button">取消</button>\
					</div>\
				</div>';

    var comment = '<div class="liuyan" :class="{nodata:!(list.length)}" id="comment-mscroll">\
                        <ul>\
                            <li v-for="v in list">\
                                <i class="touxiang"><img :src="v.data.avatar" ></i>\
                                <p class="p1">{{v.data.content}}</p>\
                                <p class="p2">{{v.data.createdDate}}</p>\
                                <i class="shanchu" v-on:click="removeItem($index,v.data.hotspotId)"></i>\
                            </li>\
                        </ul>\
                    </div>'


    var DEFAULT_OPTION = {
        align: "center",
        isMove: true,
        x: 0,
        y: 0,
        style: null,
        isEdit: false,
        commentTemplate: comment,
        element: function (data) {
            if (data.content) {
                var html = $(template(TEMPLATE, data));
                var strLen = this.yp.method.util.strLength(data.content);
                var strWidth = strLen * 8 + 60;
                if (data.isnew) {
                    html.find(".comment_bg").css({width: 40}).animate({width: strWidth});
                } else {
                    html.find(".comment_bg").css({
                        "background-color": "rgba(0,0,0,.5)",
                        width: 40
                    }).animate({width: strWidth});
                }

                return html;
            }

        },
        url: config.codePath + "/krpano/skin/img/background.png",
        callback: {
            onLoaded: function () {
                hotspotArr.push(this);
            },
            onAddHotspot: function () {
                currentHotspot = this;
            }

        },
        fromTemp: $(temp),
        formElement: $('body')
    };

    function Comments(option) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
        this.data = {};
    }

    var funs = Comments.prototype;

    funs.deps = ["plugin/groups", "plugin/toolbar", "method/hotspot", "method/login", "method/util"];

    funs.init = function (data) {
        //this.option.data = data;
        if (data) {
            this.option.data = data;
        }
        panoId = this.yp.option.panoId;
        hotComment = this.comments = this.method.hotspot.register("comments", this.option);

        var isEdit = this.option.isEdit;
        if (isEdit) {
            this.yp.element.append(this.option.commentTemplate);
        }

        // this.onNewSceneData(this.option.data);
    };

    funs.addComment = function (opt) {
        if (!flag) {
            flag = true;
            var _this = this;
            var form = this.option.elementTo ? $(this.option.elementTo) : $("body");
            var Temp = this.option.fromTemp;
            hotspot = this.comments.addHotspot({
                data: {
                    "avatar": this.yp.method.login.info.avatar,
                    "content": "拖动到想要打标签的地方",
                    "isnew": true
                }
            });

            if (!!Temp.attr("style")) {
                Temp.show();
            } else {
                form.append(Temp);
                Temp.find(".comment_form_content").focus(function () {
                    setTimeout(function () {
                        $(window).scrollTop($(window).height());
                    }, 500);
                });
                form.on('click', ".comment_form_submit", function () {
                    flag = false;
                    var content = $(this).parents().find(".comment_form_content").val();
                    var str = $(this).parents().find(".comment_form_content").val().replace(/[^\x00-\xff]/g, 'xx');
                    if (str.length > 28) {
                        alert("不能超过14中文字或28个字符");
                        return false;
                    } else if (content.length == 0) {
                        alert("请输入评论");
                        return false;
                    }
                    hotspot.data.content = content;
                    $(hotspot.hotspot.sprite).html('').append(_this.option.element(hotspot.data));
                    $(".comment_form_content").val("");
                    $(".comment_bg").css("background-color", "rgba(0,0,0,.5)");
                    Temp.hide();
                    console.log(hotspot);
                    proxy.commentAdd({
                        sceneId: _this.yp.plugin.groups.getCurrScene().id,
                        comment: content,
                        avatar: _this.yp.method.login.info.avatar,
                        ath: hotspot.hotspot.ath,
                        atv: hotspot.hotspot.atv,
                        mainPanoId: YP.panoId || panoId,
                        async: false
                    }, function (data) {
                        console.log(data);
                        if (!data.success) {
                            alert(data.errMsg);
                            _this.hotspotFn.removeHotspot();
                            return;
                        }

                        id = data.id;
                    });

                })

                form.on('click', ".comment_form_cancel", function () {
                    flag = false;
                    _this.removeComment();
                    $(".comment_form_content").val("");
                    Temp.hide();
                })
            }

            return hotspot;
        }

    }

    funs.removeComment = function (hotspot) {
        var hotspot = hotspot || currentHotspot;
        for (var i in hotspotArr) {
            if (hotspotArr[i] === hotspot) {
                hotspotArr.splice(i, 1);
            }
        }
        hotspot.remove();

        var list = this.comments.getHotspot();

        for (var i in list) {
            if (list[i] === hotspot) {
                list.splice(i, 1);
            }
        }
    };

    funs.removeAll = function () {
        var list = this.comments.getHotspot();

        for (var i in list) {
            list[i].remove();
        }

        this.comments.getHotspot().splice(0);
        hotspotArr = [];
    }
    

    funs.onnewpanodata = funs.onNewSceneData = function (data) {
        // this.removeAll();

        for (var i in data) {
            var hotspot = this.comments.addHotspot(data[i]);

            hotspot.hotspot.visible = !this.option.isEdit;
        }

        if (typeof this.yp.plugin.toolbar.commentsRefresh === "function") {
            this.yp.plugin.toolbar.commentsRefresh(data);
        }

        // proxy.commentGet({
        //     mainPanoId: panoId,
        //     sceneId: this.yp.plugin.group.getCurrScene().id,
        //     pageIndex: 2,
        //     pageSize: 20,
        //     async: false
        // }, function(data) {
        //     if (!data.success) {
        //         alert(data.errMsg);
        //     } else {
        //         result = data;

        //         for(var i=0,len = result.data.length;i<len;i++) {
        //             var opt = {};
        //             opt.ath = result.data[i].ath;
        //             opt.atv = result.data[i].atv;
        //             opt.id = result.data[i].id;
        //             opt.data = {}
        //             opt.data.avatar = result.data[i].avatar;
        //             opt.data.comment = result.data[i].comment;
        //             _this.comments.addHotspot(opt);
        //         }
        //     }
        // })
    }

    funs.onmoveupdate = function (data, hotspot) {
        console.log(hotspot.id);
        if (hotspot.id) {
            proxy.commentUpdate({
                atv: hotspot.atv,
                ath: hotspot.ath,
                id: hotspot.id
            }, function (data) {
                if (!data.success) {
                    console.log(data.errMsg);
                    return;
                } else {
                    //msg("修改成功");
                }
            })
        }
    }


    funs.getComment = function (name) {
        return this.comments.getHotspot(name);
    };


    funs.switch = function (flag) {
        for (var i in hotspotArr) {
            flag == undefined && (flag = !this.yp.settings.switch_comment);
            hotspotArr[i].hotspot.visible = flag == true;
        }
    };


    // funs.onNewSceneData = function (data) {
    //        var hotspotData = [];
    //        for(var i in data){
    //            opt = {
    //                atv :data[i].atv,
    //                ath :data[i].ath,
    //                style:data[i].style,
    //                data:data[i].data,
    //                //如果热点使用的是自定义的图片，需要下面两个参数
    //                url:data[i].url,
    //                crop:data[i].crop,
    //            };
    //            hotspotData.push(opt);
    //        }
    //        this.option.data = hotspotData;
    //        this.comments = this.method.hotspot.register("comments", this.option);
    //    };

    funs.onNewSceneCacheData = function () {
        this.cacheData = [];
        for (var i in hotspotArr) {
            var spotObj = hotspotArr[i].getData();
            this.cacheData.push(spotObj);
        }
        hotspotArr = [];
        return this.cacheData;
    };

    return Comments;
});
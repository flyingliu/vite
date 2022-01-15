define("plugin/hotspot", ["jquery", "template", 'proxy', 'config'], function($, template, proxy, config) {
    var HOTSPOT_TYPE = "hotspot",
        iconPackage,
        hotspotArr = [],
        currentHotspot,
        isMb,
        isTouch,
        isEdit,
        title,
        content,
        picmyScroll,
        stylemyscroll,
        hotspotmyscroll,
        TEMPLATE = "<div class='hotspot-element' >\
                        <div class='edit' >\
                            标题:<input class='title' type='text'><br>\
                            内容:<input class='content' type='text'><br>\
                            URL:<input class='url' type='text'><br>\
                            <button class='btn-save'>保存</button>\
                        </div>\
                        <button class='btn-delete'>删除</button>\
                        <button class='btn-edit'>编辑</button>\
                        <button class='btn-style' >选择样式</button><br>\
                        <div class='icon-style clearfix hotspoticon' >\
                            <ul class='package-list' >\
                            <%for(var i in package){%>\
                                <%if(i==0){%>\
                                    <li class='current'><a href='javascript:void(0);'><%=package[i].name%></a></li>\
                                <%} else {%>\
                                    <li><a href='javascript:void(0);'><%=package[i].name%></a></li>\
                                <%}%>\
                            <%}%>\
                            </ul>\
                            <%for(var i in package){%>\
                                <%if(i==0){%>\
                                    <ul class='icon-list current '>\
                                <%} else {%>\
                                    <ul class='icon-list'>\
                                <%}%>\
                                <%for(var j in package[i].styleList){%>\
                                    <li><a href='javascript:void(0);'><%=package[i].styleList[j].name%></a></li>\
                                <%}%>\
                                </ul>\
                            <%}%>\
                        </div>\
                    </div>",
        DEFAULT_OPTION = {
            style: 102,
            isEdit: false,
            callback: {
                onLoaded: function() {
                    hotspotArr.push(this);
                    if (this.element.find(".title")[0].tagName.toLowerCase() === "input") {
                        var pic = this.data.pic;
                        this.element.find(".title").val(this.data.title || "")
                            .end().find(".content").val(this.data.content || "");
                        this.element.find(".url").val(this.data.linkUrl || "");
                        if (!!pic) {
                            for (var i = 0; i < pic.length; i++) {
                                if (!(pic[i].indexOf("https://file.aoliliya.com") > -1)) {
                                    pic[i] = "https://file.aoliliya.com" + pic[i];
                                }

                                this.element.find(".piclist").append("<li><i></i><img src='" + pic[i] + "' class='setImgwh'/></li>");
                            }
                        }
                    } else {
                        var pic = this.data.pic;
                        var url = this.data.linkUrl;
                        // console.log(this.data)
                        this.element.find(".title").html(this.data.title || "")
                            .end().find(".content").html(this.data.content || "");
                        if (!!pic) {
                            for (var i = 0; i < pic.length; i++) {
                                if (!(pic[i].indexOf("https://file.aoliliya.com") > -1)) {
                                    pic[i] = "https://file.aoliliya.com" + pic[i];
                                }

                                this.element.find(".photos").append("<li><i></i><img src='" + pic[i] + "' class='setImgwh'/></li>");
                            }
                        } else {
                            this.element.find(".photos").hide();
                        }
                        if (!!url) {
                            this.element.find(".more > a").attr({ "href": url, "target": "_blank" });
                            this.element.find(".more > a").on('click', function() {
                                return false;
                            })
                        } else {
                            this.element.find(".more").hide();
                        }
                    }
                    this.element.hide();
                    // if (!this.element.find(".title").val().length) {
                    //     this.element.toggle("click");
                    // }
                },

                onMoveUpdate: function(data) {
                    this.yp.plugin.hotspots.onmoveupdate(data);
                },
                onClick: function() {
                        var element = this.element;
                        //移动端不支持mouse事件
                        if (isTouch || window.parent) {
                            currentHotspot = this;
                            var targetDom = event.target || event.srcElement;
                            if (targetDom.tagName.toLowerCase() == "img") {
                                $('body').mbPhotos({
                                    className: 'commentPhotos',
                                    title: this.data.title,
                                    disc: this.data.content,
                                    photos: this.data.pic
                                });
                                return false;
                            } else if (targetDom.tagName.toLowerCase() == "a") {
                                window.open(targetDom.href);
                                return false;
                            }

                            for (var i = 0; i < hotspotArr.length; i++) {
                                if (hotspotArr[i] != this) {
                                    hotspotArr[i].element.hide().find(".edit").removeClass("curr");
                                    hotspotArr[i].zorder();
                                }
                            }
                            this.zorder(true);
                            element.show().find(".edit").show().toggleClass("curr");
                        } else {
                            if (currentHotspot == this) return;
                            currentHotspot = this;
                            for (var i = 0; i < hotspotArr.length; i++) {
                                hotspotArr[i].element.hide();
                                hotspotArr[i].zorder(false);
                            }

                            if (!isEdit) {
                                if (!this.photoIndex) {
                                    this.photoIndex = layer.ready(function() {
                                        layer.photos({
                                            photos: element.find(".photos")
                                        });
                                    });
                                }
                            }

                            this.element.show();
                            currentHotspot.zorder(true);
                        }
                    }
                    //onDown:function(){},
                    //onUp:function() {},
                    //onOver:function(){alert("onOver")},
                    //onOut:function(){alert("onOut")},
                    //onHover:function(){alert("onHover")},
                    //onMoveUpdate:function(){alert("onMoveUpdate")},
                    //onUpdatestyle:function(){alert("onUpdatestyle")},
                    //onRemove:function(){},
                    //onAddHotspot:function(){alert("onAddHotspot")},
                    //onsavaHotspot:function(){}
            },

            template: TEMPLATE,
            element: undefined
        };

    function Hotspot(opt) {
        var optLoadFn, optClickFn;
        this.option = $.extend(true, {}, DEFAULT_OPTION, opt);
        optLoadFn = this.option.callback.onLoaded;
        optClickFn = this.option.callback.onClick;

        if (typeof optLoadFn === "function") {
            this.option.callback.onLoaded = function(data) {
                optLoadFn.call(this, data);
                DEFAULT_OPTION.callback.onLoaded.call(this, data)
            }
        }
        if (typeof optClickFn === "function") {
            this.option.callback.onClick = function(data) {
                optClickFn.call(this, data);
                DEFAULT_OPTION.callback.onClick.call(this, data)
            }
        }
    }

    var funs = Hotspot.prototype;
    funs.deps = ["plugin/groups", "method/icon", "method/hotspot", "method/util"];

    funs.init = function(data) {
        if (data) {
            this.option.data = data;
        }
        var _this = this;
        isMb = this.yp.method.util.browser().mobile;
        isTouch = this.yp.method.util.isTouch();
        isEdit = this.option.isEdit;
        iconPackage = _this.yp.method.icon.getIconPackage();
        var $ele;
        if (!this.option.element) {
            $ele = this.option.element = $(template(this.option.template, {
                package: iconPackage,
                codePath: config.codePath
            }));
        } else {
            $ele = $(this.option.element);
        }

        $ele.delegate(".hotspot .select i", "click", function() {
            $(this).parents(".hotspot-element").find('.edit').toggle().end().find('.icon-style').hide();
        });

        $ele.delegate(".hotspot .layui-layer-btn0", "click", function() {
            $(this).parents(".hotspot-element").find('.icon-style').toggle().end().find('.edit').hide();
        });

        $ele.delegate(".btn-save", "click", function() {
            var $hotspotElement = $(this).parents(".hotspot"),
                title = $hotspotElement.find(".title").val(),
                content = $hotspotElement.find(".content").val(),
                url = $hotspotElement.find(".url").val(),
                pic = [],
                resourceType = $(this).siblings("ul").find(".curr").data("type"),
                isLinkUse = 1;
            if ($(this).parents(".selectComment").find(".url").val()) {
                isLinkUse = 0;
            }
            // console.log(resourceType)
            for (var i = 0, len = $hotspotElement.find(".piclist img").length; i < len; i++) {
                pic[i] = $hotspotElement.find(".piclist img").eq(i).attr("src")
            }
            var data = {
                title: title,
                content: content,
                url: url,
                pics: pic,
                resourceType: resourceType,
                isLinkUse: isLinkUse,
            }
            if (!$(this).parents(".selectComment").find(".title").val()) {
                layer.msg("请填写标题");
                return;
            }
            if (!$(this).parents(".selectComment").find(".content").val()) {
                layer.msg("请填写内容");
                return;
            }
            _this.saveHotspot(data);
            $(this).parents(".select").removeClass("action");
        });

        $ele.find(".iconList li").one("click", function(data, hotspot) {
            var h = currentHotspot.hotspot;
            // console.log(hotspot)
            // console.log(currentHotspot.data.hotspotId)
            if (currentHotspot.data.hotspotId) {
                var listTitle = $(this).parents(".linker").find(".title").val(),
                    listContent = $(this).parents(".linker").find(".content").val();
                $hotspotElement = $(this).parents(".hotspot"),
                    title = $hotspotElement.find(".title").val(),
                    content = $hotspotElement.find(".content").val(),
                    url = $hotspotElement.find(".url").val(),
                    pic = [],
                    resourceType = 4,
                    isLinkUse = 1;
                var iconId;
                if ($hotspotElement.find(".piclist img").length) {
                    resourceType = 1;
                }
                if ($(this).parents(".selectComment").find(".url").val()) {
                    isLinkUse = 0;
                }
                for (var i = 0, len = $hotspotElement.find(".piclist img").length; i < len; i++) {
                    pic[i] = $hotspotElement.find(".piclist img").eq(i).attr("src")
                }
                var postData = {
                    title: title,
                    content: content,
                    url: url,
                    pics: pic,
                    resourceType: resourceType,
                    isLinkUse: isLinkUse,
                    id: currentHotspot.data.hotspotId,
                    iconId: parseInt(yp.method.icon.getIcon(this.id).iconid)
                }
                if (listTitle && listContent) {
                    _this.saveHotspot(postData);
                    return false;
                }
            }
        })

        $ele.delegate(".icon-list > li", "click", function() {
            var iconIndex = $(this).index(),
                packageIndex = $(this).parents(".hotspot-element").find('.package-list > .current').index();
            _this.updataHotspot(iconIndex, packageIndex);
        });

        function uploadmap(dom, div) {
            $(dom).fileupload({
                url: proxy.url.fileuoload2,
                dataType: "json",
                maxNumberOfFiles: 5,
                maxFileSize: 1000000, // 5 MB
                type: "post",
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/,
                messages: {
                    maxNumberOfFiles: '一次最多只能上传5张图片',
                    acceptFileTypes: '文件类型不允许',
                    maxFileSize: '文件太大',
                    minFileSize: '文件太小了'
                }
            }).on('fileuploadadd', function(e, data) {
                // console.log(data);

            }).on('fileuploadprocessalways', function(e, data) {
                $.each(data.files, function(i, file) {
                    if (file.error) {
                        msg(file.error);
                    }
                })
            }).on('fileuploadprogress', function(e, data) {
                $.each(data.files, function(i, file) {});
            }).on('fileuploaddone', function(e, data) {
                var result = data.result.files;

                $.each(result, function(i, context) {
                    // console.log(i, context);
                    if (result && result.error) {
                        msg(result.error);
                        return;
                    }

                    var urlPic = result[0].staticUrl + result[0].url;
                    var piclist = $(dom).parents(".piclist");
                    // console.log(dom);                   
                    $("<li><i></i><img src='" + urlPic + "' class='setImgwh'/></li>").appendTo(div)
                    var length = div.children("li").length * 65;
                    $(div).css("width", length);
                    setTimeout(function() {
                        picmyScroll.refresh();
                    }, 1000)

                });
            });
        }


        // $ele.find(".packageList").on("click","li",function(){
        //     var name = this.id;
        //     var curPackage = this.className;
        //     if(!!curPackage) { 
        //         $(this).addClass("action").siblings().removeClass('action');
        //         $('.hotspot .iconList').find("."+curPackage).addClass("action").siblings().removeClass('action');
        //     }
        //     !!name && currentHotspot.update({style:name});
        //     return false;
        // });

        $ele.delegate(".remove i", "click", function() {
            $(this).parents(".remove").addClass("action").siblings().removeClass("action");
        })
        $ele.delegate(".change i", "click", function() {
            $(this).parents(".change").addClass("action").siblings().removeClass("action");

            var hotspotmyscrolldom = $(this).parents(".change").find(".stylemyscroll")[0];
            requirejs(["iscroll"], function(IScroll) {
                window.IScroll = IScroll;
                hotspotmyscroll = new IScroll(hotspotmyscrolldom, { mouseWheel: false, click: true });
                document.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);
                $(hotspotmyscrolldom).on("mousedown", function() {
                    return false;
                })
            })
        })

        $ele.delegate(".apply li", "click", function() {
            var $li = $(this),
                $ul = $li.parent();
            $ul.children().removeClass("action");
            $li.addClass("action");
            $(this).parents(".hotspot").find(".iconList ul").removeClass("action").eq($li.index()).addClass("action");
            hotspotmyscroll.refresh();
        });


        $ele.delegate(".select i", "click", function() {
            $(this).parents(".select").addClass("action").siblings().removeClass("action");
            if ($(this).parents(".select").find(".piclist").find("i").length) {
                // console.log($(this).parents(".select").find(".piclist img"))
                $(this).parents(".select").find(".pic").addClass("curr");
                $(this).parents(".select").find(".pic").siblings(".wenzi").removeClass("curr");
                $(this).parents(".select").find(".two").show();
            } else {
                $(this).parents(".select").find(".wenzi").addClass("curr");
                $(this).parents(".select").find(".wenzi").siblings(".pic").removeClass("curr");
            }

            var picscroll = $(this).parents(".select").find(".picscroll")[0];
            requirejs(["iscroll"], function(IScroll) {
                picmyScroll = new IScroll(picscroll, { scrollX: true, scrollY: false, mouseWheel: true });
                $(picscroll).on("mousedown", function() {
                    return false;
                })
            })

            var div = $(this).parents(".picscroll").find(".piclist");
            uploadmap($(this), div);
        })


        // $ele.delegate(".aloneupfile","click",function(){
        //     var div = $(this).parents(".picscroll").find(".piclist");
        //     uploadmap($(this),div);
        // })

        $ele.find(".ul li").on("click", function() {
            var name = this.id;
            var curPackage = this.className;
            if (!!curPackage) {
                $(this).addClass("action").siblings().removeClass('action');
                $(this).parents(".apply").siblings('.iconStyle ').find("." + curPackage).addClass("action").siblings().removeClass('action');
            }!!name && currentHotspot.update({ style: name });
            $(this).parents(".change").removeClass("action");
            return false;
        })

        $ele.find(".packageList li:first-child,.iconList ul:first-child").addClass("action");

        $ele.delegate(".wenzi", "click", function() {
            $(".two").hide();
        });

        $ele.delegate(".pic", "click", function() {
            $(".two").show();
        });

        $ele.find(".layui-layer-btn0").on("click", function() {
            yp.plugin.hotspots.removeHotspot();
            $(this).parents(".hotspot").parent("div").remove();
            addHotspotFlag = true;
        });
        $ele.delegate(".layui-layer-btn1", "click", function() {
            $(this).parents(".remove").removeClass("action");
        })

        $ele.delegate(".iconStyle li,.style i", "click", function() {
            $(this).parents(".change").removeClass("action");
        })
        $ele.delegate(".scene i,.scene li,.selectComment > i", "click", function() {
            $(this).parents(".select").removeClass("action");
        })

        $ele.delegate(".selectComment .piclist i", "click", function() {
            $(this).parents("li").remove();
            return false;
        })

        $ele.delegate(".abble", "click", function() {
            $(this).addClass("curr").siblings().removeClass("curr");
        })

        var length = $(".packageList li").length - 1;
        var stop = 0;


        $ele.delegate(".img_r", "click", function() {
            if (stop > 3) {
                return;
            }
            stop++;
            $(this).siblings(".apply_nav").find(".packageList").animate({ left: '-=50px' }, 500);
        })

        $ele.delegate(".img_l", "click", function() {
            if (stop < 1) {
                return;
            }
            stop--;
            $(this).siblings(".apply_nav").find(".packageList").animate({ left: '+=50px' }, 500);
        })


        this.reghot = this.method.hotspot.register(HOTSPOT_TYPE, this.option);
    };

    funs.onNewSceneData = function(data) {
        for (var i in data) {
            this.reghot.addHotspot(data[i]);

            // this.yp.initEvent("onloadhotspot");
        }
    };

    funs.onNewSceneCacheData = function() {
        this.cacheData = [];
        for (var i in hotspotArr) {
            var spotObj = hotspotArr[i].getData();
            this.cacheData.push(spotObj);
        }
        hotspotArr = [];
        return this.cacheData;
    };

    funs.addHotspot = function(opt) {
        opt = opt || {
            style: 102,
            data: {}
        }
        var hotspot = this.reghot.addHotspot(opt);
        hotspot.option.callback.onClick.apply(hotspot);
        return hotspot;
    };

    funs.gotoCenter = function(hotspot) {
        hotspot = currentHotspot.hotspot;
        console.log(currentHotspot)
        hotspot.ath = this.krpano.view.hlookat;
        hotspot.atv = this.krpano.view.vlookat;
    }

    funs.removeHotspot = function(hotspot) {
        console.log(hotspot)
        hotspot = hotspot || currentHotspot;
        for (var i in hotspotArr) {
            if (hotspotArr[i] === hotspot) {
                hotspotArr.splice(i, 1);
            }
        }
        var data = {
            id: hotspot.data.hotspotId,
            belongPanoId: getQueryString("id")
        }
        if (data.id) {
            proxy.removeLink(data, function(data) {
                if (data.success) {
                    hotspot.remove();
                }
            })
        }
    };

    funs.getHotspot = function(hotspotName) {
        return this.reghot.getHotspot(hotspotName);
    };

    //修改style
    funs.updataHotspot = function(iconId, packageId, hotspot) {
        hotspot = hotspot || currentHotspot;
        if (typeof iconId === "object") {
            hotspot.update(iconId);
            return;
        }
        packageId = packageId || 0;
        var name = iconPackage[packageId].styleList[iconId].name;
        hotspot.update({ style: name });
    };

    //修改url
    funs.setUrl = function(urlStr, hotspot) {
        hotspot = hotspot || currentHotspot;
        hotspot.update({ url: urlStr });
    };

    funs.saveHotspot = function(data, hotspot) {
        // hotspot = hotspot||currentHotspot;
        // hotspot.data = data;
        // hotspot.save(data);
        var h = currentHotspot.hotspot;
        // console.log(h)
        var hotspotData = {
            atv: h.atv,
            ath: h.ath,
            mainPanoId: getQueryString("id"),
            panoId: this.yp.plugin.groups.getCurrScene().id,
            type: 2,
            iconId: data.iconId || parseInt(yp.method.icon.getIcon(h.style).iconid),
            hotspotType: 1,
            title: data.title,
            content: data.content,
            isLinkUse: data.isLinkUse,
            resourceType: data.resourceType,
            linkUrl: data.url,
            pics: data.pics,
            id: currentHotspot.data.hotspotId
        };
        proxy.addHotspot(hotspotData, function(data) {
                if (data.success) {
                    layer.msg("保存成功");
                    if (data.id) currentHotspot.data.hotspotId = data.id;
                    addHotspotFlag = true;
                }
            })
            // console.log(data)
    };

    funs.onmoveupdate = function(data) {
        // console.log(data.data.hotspotId);
        if (data.data.hotspotId) {
            proxy.addHotspot({
                atv: data.atv,
                ath: data.ath,
                id: data.data.hotspotId,
                mainPanoId: getQueryString("id")
            }, function(data) {
                if (!data.success) {
                    // console.log(data.errMsg);
                    return;
                } else {
                    //msg("修改成功");
                }
            })
        }
    }

    funs.onnewpanodata = function(data) {
        this.cacheData = [];
        hotspotArr = [];
        this.init(data);
    }


    funs.switch = function(flag) {
        for (var i in hotspotArr) {
            hotspotArr[i].hotspot.visible = flag;
        }
    };


    //funs.getStyleList = function (packageId) {
    //    return iconPackage[packageId].styleList;
    //};
    //
    //funs.setCurrentHotspot = function (hotspot) {
    //    currentHotspot = hotspot;
    //};
    //
    //funs.setZorder = function (flag,hotspot) {
    //    hotspot = hotspot||currentHotspot;
    //    currentHotspot.zorder(flag);
    //};

    return Hotspot;
});
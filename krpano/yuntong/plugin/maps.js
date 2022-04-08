define("plugin/maps", ["jquery", "template","iscroll"], function ($, template,IScroll) {
    var TEMPLATE = '<div class="maps-bg">\
                        <div class="maps-addRadar">添加热点</div>\
                        <div class="maps-removeRadar">删除热点</div>\
                        <ul class="maps-names">\
                            <%for(var i in maps){%>\
                                <li class="maps-name"><%=maps[i].name%></li>\
                            <%}%>\
                        </ul>\
                        <ul class="maps-scenes">\
                            <%for(var i in scenes){%>\
                                <li class="maps-scene" data-scene="<%=scenes[i].pid%>"><%=scenes[i].name%></li>\
                            <%}%>\
                        </ul>\
                        <div class="maps"/>\
                    </div>';
    var DEFAULT_OPTION = {
        template: TEMPLATE,
        element: undefined,
        isEdit: false,
        radar: {
            template: '<div class="radar"><dl class="dl"><dd class="changeScene"><i></i><div class="scene"><h5>选择连接场景</h5><i></i><div class="mapsscenescroll"><ul class="maps-scenes">\
                        <%for(var i in scenes){%>\
                            <li class="maps-scene" data-scene="<%=scenes[i].pid%>"><%=scenes[i].name%></li>\
                        <%}%>\
                    </ul></div></div></dd>\
                    <dd class="removeRadar"><i></i><div class="radarDialog">\
                        <p>你确定要删除该热点吗？</p>\
                        <div>\
                            <a class="layui-layer-btn0 btnRemoveRadar">确定</a>\
                            <a class="layui-layer-btn1 btnReset">取消</a>\
                        </div>\
                    </div></dd></dl></div>'
        },
        data: []
    };

    function Maps(options) {
        this.option = options;
        this.options = $.extend(true, {}, DEFAULT_OPTION, options);
        this.data = {};
    }

    var funs = Maps.prototype;
    funs.deps = ["method/scene", "method/maps"];

    //funs.onNewSceneData = function (data) {
    //    for (var i in data) {
    //        this.addMap(data[i]);
    //    }
    //};
    //
    //funs.onNewSceneCacheData = function () {
    //    return this.maps.maps;
    //};

    funs.getMaps = function () {
        return this.maps.maps;
    };

    funs.addMap = function () {
        return this.maps.addMap.apply(this.maps, arguments);
    };

    funs.removeMap = function (obj) {
        var map = obj;

        if (obj instanceof $) {
            map = obj.data("map");
        }

        return this.maps.removeMap(map);
    };

    funs.getCurrMap = function () {
        return this.maps.currMap;
    };

    funs.getCurrRadar = function () {
        return this.maps.currRadar;
    };

    funs.init = function (newdata) {
        var _this = this;
        this.options.element = this.options.element || $("body");
        this.options.data = newdata || this.options.data;
        this.element = $(template(this.options.template, {
            scenes: this.method.scene.getScene(),
            maps: this.options.data
        }));
        this.options.element.append(this.element);

        // console.log(_this.options.data);
        this.mapsNames = this.element.find(".maps-names");
        this.mapsElement = this.element.find(".maps");
        this.mapsScene = this.element.find(".maps-scenes");

        var options = $.extend(true, {}, this.options, {
            element: this.mapsElement,
            callback: {
                onMapsAdd: function (data) {
                    var e = $(_this.options.template).find(".maps-name").clone();
                    _this.mapsNames.append(e.html(data.name).data("map", data));

                    _this.callwith("onMapsAdd", data, this);
                },
                onRadarAdd: function (data) {
                    _this.onnewscene();
                    _this.callwith("onRadarAdd", data, this.maps);
                },
                onRadarRemove: function (data) {
                    _this.onnewscene();
                    _this.callwith("onRadarRemove", data, this);
                },
                onRadarChange: function (data) {
                    if (_this.maps) {
                        _this.onnewscene();
                    }

                    sceneChangeToClass(this.map.currMap.radars);

                    _this.callwith("onRadarChange", data, this);
                },
                onMapsChange: function (data) {
                    sceneChangeToClass(data);

                    _this.callwith("onMapsChange", data, this);
                },
                onMapsLoaded: function (data) {
                }
            }
        });

        var sceneChangeToClass = function (data) {
            if (_this.radarElement) {
                _this.radarElement.find(".maps-scene").each(function () {
                    $(this).removeClass("disabled active");

                    for (var i in data) {

                        if (_this.maps.currRadar && _this.maps.currRadar.scene == $(this).data("scene")) {
                            $(this).addClass("active");
                        } else if ($(this).data("scene") == data[i].scene) {
                            $(this).addClass("disabled");
                        }
                    }
                })
            }
        }.bind(this);

        this.mapName = "maps";
        this.maps = this.method.maps.register(this.mapName, options);
        this.activespot = this.krpano.get("layer[activespot]");
        if (this.options.isEdit) {
            this.radarElement = $(template(options.radar.template, {
                scenes: this.method.scene.getScene(),
            }));
            this.maps.radarDiv = $(this.radarElement).appendTo(this.activespot.sprite);
            _this.maps.myscrolls = new IScroll(_this.maps.radarDiv.find(".mapsscenescroll")[0], {
                mouseWheel: true,
                click: true,
                scrollbars: true,
                interactiveScrollbars: true
            })
            _this.maps.radarDiv.find(".mapsscenescroll").on("mousedown", function () {
                return false;
            })

        }


        this.mapsNames.find(".maps-name").each(function (i) {
            $(this).data("map", _this.getMaps()[i]);
        });

        this.mapsNames.delegate(".maps-name", "click", function () {
            _this.maps.activeMap($(this).data("map"));
        });

        this.element.delegate(".maps-addRadar", "click", function () {
            // sceneChangeToClass(data);
            _this.maps.addRadar();
        });

        this.element.delegate(".maps-removeRadar", "click", function () {
            _this.maps.removeRadar();
        });

        var changeSceneFn = function () {
            if (_this.maps.currRadar) {
                _this.maps.currRadar.changeScene($(this).data("scene"));
                sceneChangeToClass(_this.maps.currMap.radars);
            } else {
                YP.error("请选择热点");
            }
        };

        this.mapsScene.delegate(".maps-scene", "click", changeSceneFn);
        this.radarElement && this.radarElement.delegate(".maps-scene:not(.disabled)", "click", changeSceneFn);

        this.maps.currMap && sceneChangeToClass(this.maps.currMap.radars);
        _this.callwith("onMapsLoaded", this.maps.currMap);
    };

    funs.onnewscene = function () {
        var _this = this;

        if (_this.maps.currMap) {
            _this.mapsScene.find(".maps-scene").each(function () {
                $(this).removeAttr("disabled");

                for (var i in _this.maps.currMap.radars) {
                    var radar = _this.maps.currMap.radars[i];

                    if (radar.scene == $(this).data("scene")) {
                        $(this).attr("disabled", true);
                    }
                }
            })
        }
    };

    funs.callwith = function (type, data, obj) {
        if (this.option.callback && typeof this.option.callback[type] === "function") {
            this.option.callback[type].call(obj || this.maps, data);
        }
    };

    funs.changeSceneHtml = function (groupId) {
        var _this = this;
        var sceneList = []
        if (!getQueryString("level")) {
            this.plugin.maps.mapsScene.find(".mapsscenescroll").html($(template(this.plugin.maps.options.template, {
                scenes: this.plugin.maps.method.scene.getScene()
            })).find(".maps-scenes"));
            this.plugin.maps.radarElement.find(".mapsscenescroll").html($(template(this.plugin.maps.options.radar.template, {
                scenes: this.method.scene.getScene()
            })).find(".maps-scenes"));
            _this.plugin.maps.maps.myscrolls = new IScroll(_this.plugin.maps.maps.radarDiv.find(".mapsscenescroll")[0], {
                mouseWheel: true,
                scrollbars: true,
                interactiveScrollbars: true
            })
            _this.plugin.maps.maps.radarDiv.find(".mapsscenescroll").on("mousedown", function () {
                return false;
            })
        } else {
            for (var i in yp.plugin.groups.getGroup()) {
                if (groupId == yp.plugin.groups.getGroup()[i].groupId) {
                    sceneList = yp.plugin.groups.getGroup()[i].list
                }
            }
            this.plugin.maps.mapsScene.find(".mapsscenescroll").html($(template(this.plugin.maps.options.template, {
                scenes: sceneList
            })).find(".maps-scenes"));
            this.plugin.maps.radarElement.find(".mapsscenescroll").html($(template(this.plugin.maps.options.radar.template, {
                scenes: sceneList
            })).find(".maps-scenes"));
            _this.plugin.maps.maps.myscrolls = new IScroll(_this.plugin.maps.maps.radarDiv.find(".mapsscenescroll")[0], {
                mouseWheel: true,
                scrollbars: true,
                interactiveScrollbars: true
            })
            _this.plugin.maps.maps.radarDiv.find(".mapsscenescroll").on("mousedown", function () {
                return false;
            })
        }
    }

    funs.onremovescene = function (scene) {
        console.log(funs.onremovescene);
        this.changeSceneHtml();
        this.onnewscene();
        var mapsList = this.yp.plugin.maps.maps.maps;
        for (var i in mapsList) {
            for (var r in mapsList[i].radars) {
                if (mapsList[i].radars[r].scene == scene.name) {
                    mapsList[i].radars[r].remove();
                }
            }
        }
    };

    funs.onaddscene = function () {
        this.changeSceneHtml();
        this.onnewscene();
    };

    funs.onnewpanodata = function (data) {
        this.yp.method.maps.destroy(this.mapName);
        $(".maps-bg").remove();
        this.init(data);
    };


    return Maps;
});
define("method/maps", ["config"], function (config) {
    var list = {},
        initXml = false,
        currRadar = 0;

    var DEFAULT_OPTIONS = {
        move: false,
        element: undefined,
        style: {
            width: 1000,
            height: 500,
            bgAlpha: 0.8,
            bgColor: 0x000000
        },
        radar_scale: 1.2,
        point_scale: 0.6,
        radar: {
            move: false,
            editHeading: false
        },
        callback: {
            onMapAdd: undefined,
        },
        data: []

    };

    var DEFAULT_OPTIONS_RADAR = {
        scene: undefined,
        x: 0,
        y: 0,
        heading: 0

    };

    function Maps(options, funs) {
        this.krpano = funs.krpano;
        this.method = funs.yp.method;
        this.setting = funs.setting;
        this.yp = funs.yp;

        this.init(options, funs);
    }

    var fn = Maps.prototype;
    Maps.name = "maps";

    fn.init = function (options, funs) {
        // debugger
        if (!options.element) {
            YP.error("参数错误");
            return;
        }

        this.options = $.extend(true, {}, DEFAULT_OPTIONS, options);

        //jquery的extend会将list转化为object,为了在后面代码中可以使用push方法.
        if (!(this.options.data instanceof Array)) {
            var data = this.options.data;
            this.options.data = [];
            for (var i in data) {
                this.options.data.push(data[i]);
            }
        }

        this.element = this.options.element;
        this.mapsType = this.options.mapsType;
        this.createdMap(this.options);
        this.element.width(this.options.style.width);
        this.element.height(this.options.style.height);
        this.element.css("overflow", "hidden")
        this.element.append(this.pluginBg.sprite);
        // this.round = this.krpano.get("layer[maps_round]");
        // this.point = this.krpano.get("layer[maps_point]");


        if (this.options.data) {
            for (var i in this.options.data) {
                var map = this.options.data[i];
                this.plugin.url = this.options.data[i].url;
            }
        }
    };

    fn.getPlugin = function (name) {
        return this.krpano.get("plugin[" + name + "]");
    };

    /**
     * 创建地图
     */
    fn.createdMap = function () {
        //背景
        this.pluginBg = this.krpano.addplugin(random(10));
        this.pluginBg.width = this.options.style.width;
        this.pluginBg.height = this.options.style.height;
        //this.pluginBg.align = "center";
        //this.pluginBg.edge = "center";
        this.pluginBg.bgalpha = this.options.style.bgAlpha;
        this.pluginBg.bgColor = this.options.style.bgColor;
        this.pluginBg.loadstyle("default_maps_bg");

        //图片
        var name = random(10);
        var plugin = this.plugin = this.krpano.addplugin(name);
        this.plugin.parent = this.pluginBg.name;
        this.plugin.is_move = this.options.move;
        this.plugin.loadstyle("default_maps");
        this.currRadar;
        this.plugin.maps = this.maps = [];
        this.plugin.defualt_point_scale = this.options.point_scale;

        for (var j in this.options.data) {
            var data = this.options.data[j];
            var map = $.extend({}, data);
            map.radars = [];
            if (map.id!=-1) {
                this.maps.push(map);
            }
        }

        this.initData(0);

        this.callwith("onMapsLoaded");
    };

    fn.initData = function (i) {
        if (!this.options.data[i]) {
            return;
        }

        this.loading = this.loading || $("<div/>").append(this.method.util.loading()).css({
                "position": "absolute",
                "width": "100%",
                "background-color": "rgba(0, 0, 0, 0.42)",
                "height": "100%",
                "z-index": 9999
            });

        this.element.append(this.loading).css({position: "relative"});
        if (this.options.data.length <= i) {
            return;
        }

        var mapDate = this.options.data[i];

        if (this.options.data[i].init == true || !mapDate) {
            return;
        }

        //垃圾数据
        if (!mapDate.url) {
            logger.warn("图片未找到");
        }
        console.log(this.maps[i]);

        this.currMap = this.maps[i];
        console.log(i)
        this.options.data[i].init = true;

        this.plugin.loadmaps = function () {
            if (this.loading) {
                this.loading.remove();
                this.loading = undefined;
            }

            for (var j in mapDate.radars) {
                var radarDate = mapDate.radars[j];

                if (!(radarDate.scene && this.method.scene.getScene(radarDate.scene))) {
                    logger.warn("热点初始化失败,未找到scene=" + radarDate.scene);
                    return;
                }

                //添加热点, 并设置当前的热点数据
                var radar = new Radar(this, $.extend(true, {}, radarDate));

                //选择当前场景
                if (radar.scene == this.method.scene.getCurrScene().name) {
                    radar.active();
                }
            }

            this.activeMap(this.maps[i]);
        }.bind(this);

        this.krpano.call("callwith(plugin[" + this.plugin.name + "], loadmaps);");
        // this.plugin.onloaded = "skin_maps_onloaded()";

        this.plugin.onloaded = function(){
            this.krpano.call("skin_maps_onloaded();");
        }.bind(this)
        this.plugin.url = this.currMap.url;
    };

    fn.addMap = function (data) {
        if (!data.url || !data.name) {
            throw new Error("创建平面地图失败,参数错误 url=" + data.url + ", data.name" + data.name);
        }

        this.options.data.push(data);
        var map = $.extend({}, data);
        map.radars = [];
        if (map.id!=-1) {
            this.maps.push(map);
            this.activeMap(map);
            this.callwith("onMapsAdd", map);
        }

    };

    fn.removeMap = function (map) {
        var index = this.maps.indexOf(map);
        // for (var i = 0, len = this.maps.length; i < len; i++) {
        //     if (this.maps[i].url === map.url) {
        //         index = i;
        //     }
        // }
        var radarsList = map.radars
        for (var i in radarsList) {
            for (var j in map.radars) {
                if (getQueryString("level")) {
                    if (radarsList[i].id == map.radars[j].id) {
                        map.radars[j].remove();
                    }
                } else {
                    if (radarsList[i].data.id == map.radars[j].data.id) {
                        map.radars[j].remove();
                    }
                }
            }
        }
        this.currMap.radars = []
        this.maps.splice(index, 1);

        if (map == this.currMap) {
            if (this.maps.length > 1) {
                if (index != 0) {
                    this.activeMap(this.maps[index-1]);
                } else {
                    this.activeMap(this.maps[0]);
                }
            }
        }
    };

    fn.removeRadar = function () {
        if (this.currMap && this.currRadar) {
            this.currRadar.remove();
        } else {
            YP.error("未选择热点");
            //throw new Error("未选择热点");
        }

    };

    fn.callwith = function (type, data) {
        if (this.options.callback && typeof this.options.callback[type] === "function") {
            this.options.callback[type].call(this, data);
        }
    };

    /**
     * 选中当前地图
     * @param map
     */
    fn.activeMap = function (map) {
        var index = this.maps.indexOf(map);

        this.unActiveMap();
        if (!this.options.data[index].init) {
            this.initData(index);
            return;
        }

        this.plugin.url = map.url;
        this.currMap = map;

        for (var i in this.currMap.radars) {
            var radar = this.currMap.radars[i];
            radar.plugin.visible = true;
        }

        this.activeByScene();
    };

    fn.unActiveMap = function () {
        for (var i in this.maps) {
            for (var j in this.maps[i].radars) {
                var radar = this.maps[i].radars[j];
                radar.plugin.visible = false;
                radar.unActive();
            }
        }
    };

    fn.activeByScene = function () {
        for (var i in this.currMap.radars) {
            var radar = this.currMap.radars[i];

            if (this.method.scene.getCurrScene().name == radar.scene) {
                radar.active();
                this.callwith("onMapsChange", this.currMap.radars);
            }
        }
    };

    fn.getMaps = function () {
        return this.maps;
    };

    /**
     * 重新设置地图的高宽
     * @param width 高
     * @param height 宽
     */
    fn.resize = function (width, height) {
        this.pluginBg.width = this.options.style.width = width;
        this.pluginBg.height = this.options.style.height = height;
        this.element.width(width);
        this.element.height(height);
        this.plugin.onloaded = "skin_maps_onloaded()";
        this.krpano.call("callwith(plugin[" + this.plugin.name + "], onloaded)");
    };

    /**
     * 添加热点
     * @param flag 是否选中, 默认选中
     * @returns {Radar} 热点对象
     */
    fn.addRadar = function (flag, data) {

        var option = {
            scene: this._getNotUseScene()
        };

        if (!option.scene) {
            return;
        }
        
        var radar = new Radar(this, $.extend(true, {}, option, data));

        if (typeof flag === "undefined" ? true : flag) radar.active();

        radar.callwith("onRadarAdd");

        return radar;
    };

    fn._getNotUseScene = function (name) {
        var list= [],groupId
        var isScene = function (name) {
            if (this.currMap.radars.length == 0) {
                return name;
            }

            for (var j in this.currMap.radars) {
                if (this.currMap.radars[j].scene == name) {
                    return;
                }
            }

            return name;
        }.bind(this);

        if (name) {
            return isScene(name);
        }

        if (!getQueryString("level")) {
            var currScene = isScene(this.method.scene.getCurrScene().name);
    
            if (currScene) {
                return currScene;
            }
            for (var i in this.method.scene.getScene()) {
                var scene = this.method.scene.getScene()[i];
                currScene = isScene(scene.pid);
    
                if (currScene) {
                    return currScene;
                }
            }
        } else {
            for (var i in yp.plugin.groups.getGroup()) {
                if (this.currMap.groupId == yp.plugin.groups.getGroup()[i].groupId) {
                    list = yp.plugin.groups.getGroup()[i].list
                }
            }
            for (var i in list) {
                var scene = list[i];
                currScene = isScene(scene.pid);
    
                if (currScene) {
                    return currScene;
                }
            }
        }
        
        
        YP.error("一个平面地址只能有一个场景热点");
        return;
        //throw new Error("一个平面地址只能有一个场景热点");
    };

    fn.showMsg = function (msg, fn) {
        return fn(msg);
    };


    function random(length) {
        return YP.random(length);
    }

    /**
     * 热点
     * @param map 当前地图
     * @constructor
     */
    function Radar(map, data) {
        var self = this;
        this.map = map;
        this.method = map.method;
        this.options = map.options.radar;
        this.krpano = map.krpano;
        this.plugin = this.krpano.addplugin(random(10));
        this.plugin.keep = true;
        this.plugin.scalechildren = true;
        map.currMap.radars.push(this);
        this.heading = 0;
        this.plugin.scale = map.plugin.radar_scale;
        this.plugin.defualt_scale = map.options.radar_scale;

        if (this.plugin.scale && this.plugin.scale != 1) {
            this.plugin.x = map.plugin.width / 2;
            this.plugin.y = map.plugin.height / 2;
        } else {
            //设置热点在当前框的中间
            this.plugin.x = map.pluginBg.width / 2 - (map.plugin.x ? map.plugin.x : 0);
            this.plugin.y = map.pluginBg.width / 2 - (map.plugin.y ? map.plugin.y : 0);

            //防止超出
            if (this.plugin.x > map.plugin.width) {
                this.plugin.x = map.plugin.width;
            } else if (this.plugin.x < 0) {
                this.plugin.x = 0;
            }

            if (this.plugin.y > map.plugin.height) {
                this.plugin.y = map.plugin.height;
            } else if (this.plugin.y < 0) {
                this.plugin.y = 0;
            }
        }

        this.plugin.loadstyle("mapspot");
        this.plugin.parent = map.plugin.name;
        this.activespot = this.krpano.get("layer[activespot]");
        this.radar = this.options.editHeading ? this.krpano.get("layer[editradar]") : this.krpano.get("layer[radar]");
        //this.radar = this.krpano.get("layer[editradar]");
        this.round = this.krpano.get("layer[maps_round]");
        this.point = this.krpano.get("layer[maps_point]");
        this.mapsBg = this.krpano.get("layer[maps_bg]");
        this.plugin.ondown = "skin_maps_draglayer()";

        this.plugin.onup = function () {
            this.callwith("onRadarMoveUp", this.getData());
        }.bind(this);

        this.plugin.is_move = this.options.move;
        this.setDate(data);

        this.plugin.onclick = function () {
            self.active();
        };
    }

    var fnR = Radar.prototype;

    fnR.changeScene = function (name) {
        var scene = this.map._getNotUseScene(name);

        if (scene) {
            this.setDate({scene: name});

            if (this == this.map.currRadar) {
                this.method.scene.getCurrScene().name != this.scene && this.method.scene.loadScene(this.scene);
            }

            this.callwith("onRadarChange");
            // this.active();
        } else {
            YP.error("该热点已有,请重新选择");
            //throw new Error("改热点已有,请重新选择");
        }
    };

    fnR.callwith = function (type, data) {
        if (this.map.options.callback && typeof this.map.options.callback[type] === "function") {
            this.map.options.callback[type].call(this, data || this.getData());
        }
    };

    fnR.remove = function () {
        var index = this.map.currMap.radars.indexOf(this.currRadar);
        this.map.currMap.radars.splice(index, 1);
        this.unActive();

        this.krpano.removeplugin(this.plugin.name);
        this.callwith("onRadarRemove");
    };

    /**
     * 选择热点
     */
    fnR.active = function () {
        var self = this;

        //取消之前选择状态.
        if (this.map.currRadar) {
            this.map.currRadar.unActive();
        }

        if (!getQueryString("levelShow")) {
            this.method.scene.getCurrScene().name != this.scene && this.method.scene.loadScene(this.scene);

            this.activespot.parent = this.plugin.name;
            this.setEvent(this.activespot);
            this.activespot.visible = true;
    
            this.radar.parent = this.plugin.name;
            this.radar.heading = this.heading;
            this.radar.visible = true;
            this.map.currRadar = this;
            this.plugin.zorder = 2;
            this.radar.scale = this.map.options.radar_scale
            this.setEvent(this.round);
    
            if (this.options.editHeading) {
                this.round.visible = true;
                this.point.visible = true;
                this.mapsBg.visible = true;
    
                this.round.parent = this.radar.name;
                this.mapsBg.parent = this.plugin.name;
                
                //传递事件
                $(this.point.sprite).mousedown(function (event) {
                    self.triggerRadar("mousedown", event);
                    self.editRadar(true);
                }).mouseup(function (event) {
                    self.triggerRadar("mouseup", event);
                    self.editRadar(false);
                }).mousemove(function (event) {
                    self.triggerRadar("mousemove", event);
                });
    
                window.radar["mousemove"] = function (heading) {
                    this.map.currRadar && this.map.currRadar._setRoundHeading.call(this, heading);
                }.bind(this);
    
                window.radar["mouseup"] = function (heading) {
                    this.map.currRadar.setDate({heading: heading});
                    this.callwith("onRadarChangeHeading", heading.toFixed(2));
                }.bind(this);
            } else {
                this.round.visible = false;
                this.point.visible = false;
                this.mapsBg.visible = false;
            }
        } else {
            try {
                yp.plugin.toolbar.app.$refs.mapschild.spaceId = this.data.spaceId
            } catch (error) {
                
            }
            
        }
        

        this.callwith("onRadarChange");
    };

    fnR.unActive = function () {
        this.activespot.visible = false;
        this.radar.visible = false;
        this.round.visible = false;
        this.point.visible = false;
        this.mapsBg.visible = false;
        this.plugin.zorder = 1;

        this.map.currRadar = undefined;
    };

    /**
     * 设置角度
     * @param heading
     * @private
     */
    fnR._setRoundHeading = function (heading) {
        this.round.rotate = heading + this.radar.headingoffset;
        this.heading = heading - this.krpano.get("view.hlookat");
    };

    /**
     * 设置是否编辑
     * @param flag true:是  false:否
     */
    fnR.editRadar = function (flag) {
        this.radar.editmode = flag && this.options.editHeading ? true : false;
    };

    /**
     * 触发事件
     * @param type 事件类型
     * @param event 事件对象
     */
    fnR.triggerRadar = function (type, event) {
        //触发js事件
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent(type, true, true, window, document.defaultView, event.screenX, event.screenY, event.clientX, event.clientY, false, false, false, false, 0, null);
        this.krpano.get("layer[editradar]").child.path.dispatchEvent(e);
    };

    /**
     * 传递时间给点, 可以移动
     * @param dom 传递的对象
     * @param name 传递给谁 默认:this.plugin.name
     */
    fnR.setEvent = function (dom, name) {
        name = name ? name : this.plugin.name;

        dom.ondown = "set(plugin[" + name + "].pressed, true); callwith(plugin[" + name + "], ondown);"
        dom.onup = "delete(plugin[" + name + "].pressed); plugin[" + name + "].onup();";
    };

    /**
     * 获取当前热点的数据
     */
    fnR.getData = function () {
        var data = this.data;

        data.scene = this.scene;
        data.x = this.plugin.x;
        data.y = this.plugin.y;
        data.heading = this.heading.toFixed(2);

        return data;
    };

    fnR.setDate = function (data) {
        if (!data) return;
        this.scene = data.scene ? data.scene : this.scene;
        this.plugin.x = typeof data.x === "number" ? data.x : this.plugin.x;
        this.plugin.y = typeof data.y === "number" ? data.y : this.plugin.y;
        this.radar.currheading = this.heading = typeof data.heading === "number" ? data.heading : this.heading;
        this.data = $.extend(true, {}, this.data, data);
    };

    function Map() {
    }

    var funs = Map.prototype;
    funs.xml = config.codePath + "/plugin/xml/maps.xml";
    funs.deps = ["method/util"];

    funs.get = function (mapsType) {
        return list[mapsType];
    };

    funs.register = function (mapsType, options) {
        if (!list[mapsType]) {
            options.mapsType = mapsType;
            list[mapsType] = new Maps(options, this);
        }
        return this.get(mapsType);
    };

    funs.destroy = function (mapsType) {
        if (list[mapsType]) {
            var map = list[mapsType];

            map.unActiveMap();
            //清除对象
            this.krpano.removeplugin(map.plugin.name);

            list[mapsType] = undefined;
        }
    };

    funs.init = function () {
    };

    return funs;
});
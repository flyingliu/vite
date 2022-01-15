define("plugin/keepsakes", ["jquery", "template", 'proxy', 'config', 'vue'], function ($, template, proxy, config, Vue) {
    var hotspotArr = [];
    var hotKeepsake;
    var hotspot;
    var flag = false;
    var currentHotspot;
    var porxy;
    var panoId;
    var i;
    var elementTo = undefined;
    var TEMPLATE = '<div class="heres keepsakes move click" :data-id="hotspotId"><div class="heart"><img class="heartimg" :src="bg"></div><i class="avatar"><img v-if="avatar" :src="filePath + avatar" /></i></div>';
    var DEFAULT_OPTION = {
        align: "center",
        isMove: true,
        url: config.codePath + "krpano/skin/img/background.png",
        iconId: false,
        element: TEMPLATE,
        callback: {
            onClick: function () {
                currentHotspot = this;
                for (var i = 0; i < hotspotArr.length; i++) {
                    hotspotArr[i].element.find(".linker").hide();
                    hotspotArr[i].zorder();
                }
                currentHotspot.zorder(true);
                var appData = {
                    hotspotId: +this.data.hotspotId,
                    id: +this.data.keepsakeId || +this.data.id,
                    flag: 3
                }
                if (typeof this.yp.plugin.toolbar.browser == "function") {
                    var send = this.yp.plugin.toolbar.browser();
                }
                proxy.postMessage("clickHere", appData);
                console.log(appData);
            },
            onLoaded: function () {
                hotspotArr.push(this);
                var element = this.element[0];
                this.vm = new Vue({
                    el: element,
                    data: {
                        bg: config.codePath + "skin/default/images/heart.png",
                        filePath: config.filePath,
                        avatar: this.data.avatar,
                        hotspotId: this.data.hotspotId
                    }
                });
            },
            onAddHotspot: function () {
                currentHotspot = this;
            }
        }
    };

    function Keepsakes(option) {

        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
    }

    var funs = Keepsakes.prototype;

    funs.deps = ["plugin/groups",
        "method/hotspot",
        "method/login",
        "method/util"
    ];

    funs.init = function (data) {

        var newData = {}
        for (var i in data) {
            newData[i] = {
                ath: data[i].ath,
                atv: data[i].atv,
                data: data[i]
            }
        }
        this.option.data = newData;
        this.keepsake = this.method.hotspot.register("keepsake", this.option);
    };

    funs.addKeepsake = function (opt) {
        opt = opt || {
            url: config.codePath + "krpano/skin/img/background.png",
            iconId: false,
            data: {}
        }
        var hotspot = this.keepsake.addHotspot(opt);
        return hotspot;
    }

    funs.removeKeepsake = function (hotspot) {
        var hotspot = hotspot || currentHotspot;
        for (var i in hotspotArr) {
            if (hotspotArr[i] === hotspot) {
                hotspotArr.splice(i, 1);
            }
        }
        hotspot.remove();
    };

    funs.removeAll = function () {
        var list = this.heres.getKeepsake();

        for (var i in list) {
            list[i].remove();
        }

        this.keepsake.getHotspot().splice(0);
        hotspotArr = [];
    }

    funs.onmoveupdate = function (data, hotspot) {

    }


    funs.getKeepsakes = function (name) {
        return this.keepsake.getHotspot(name);
    };


    funs.switch = function (flag) {
        for (var i in hotspotArr) {
            flag == undefined && (flag = !this.yp.settings.switch_comment);
            hotspotArr[i].hotspot.visible = flag == true;
        }
    };

    funs.onNewSceneData = funs.onnewpanodata = function (data) {
        if (typeof ally === "object") {
            ally.positionHotspot(config.hotspotId, data);
        }
        for (var i in data) {
            var hotspot = {
                ath: data[i].ath,
                atv: data[i].atv,
                data: data[i]
            }
            this.keepsake.addHotspot(hotspot);
        }
    };


    funs.onNewSceneCacheData = function () {
        this.cacheData = [];
        for (var i in hotspotArr) {
            var spotObj = hotspotArr[i].data;
            this.cacheData.push(spotObj);
        }
        hotspotArr = [];
        return this.cacheData;
    };

    return Keepsakes;
});
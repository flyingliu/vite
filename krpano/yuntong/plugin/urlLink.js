define("plugin/urlLinks", ["jquery", "template"], function ($, template) {
    var currentHotspot;
    var hotspotArr = [];
    var krpano;
    var DEFAULT_OPTION = {
        element: function (data) {
            console.log(data.name)
            var Link = "<div class='linkWrap'><a class='linkTitle'><%=name%></a></div>";
            var urlLink = $(template(Link, data));
            return urlLink;
        },
        isMove: true,
    };

    function UrlLinks(option) {
        var _this = this;
        this.option = option;
        this.options = $.extend(true, {}, DEFAULT_OPTION, option, {
            callback: {
                onClick: function (data) {
                    window.location.href = data.data.urlLink;
                    _this.callwith("onClick", this, arguments);
                },
                onLoaded: function (data) {
                    _this.callwith("onLoaded", this, arguments);
                    hotspotArr.push(this);
                }
            }
        });
    }

    var funs = UrlLinks.prototype;
    funs.deps = ["method/hotspot"];

    funs.init = function (data) {
        krpano = this.krpano;
        yp = this.yp;
        this.links = this.method.hotspot.register("urlLinks", this.options);
    };

    funs.callwith = function (type, _this, data, hotspot) {
        if (this.option.callback && typeof this.option.callback[type] === "function") {
            this.option.callback[type].call(_this, data);
        }
    };

    funs.onNewSceneData = function (data) {
        for (var i in data) {
            this.links.addHotspot(data[i]);
        }
    };

    funs.onNewSceneCacheData = function () {
        this.cacheData = [];
        for (var i in hotspotArr) {
            var spotObj = hotspotArr[i].getData();
            this.cacheData.push(spotObj);
        }
        hotspotArr = [];
        return this.cacheData;
    };

    return UrlLinks;
});
define("method/webvr",["config","proxy"], function (config,proxy) {
    var funs = {name: "webvr"};
    var onexitvrs = [];
    var onentervrs = [];
    var tempHotspots = [];

    funs.init = function () {
        var krpano = this.krpano;
        var webVR = this.krpano.get("plugin[WebVR]"),
            _this = this;
        this.krpano.call("vr_menu_setvisibility(false);");
        webVR.onentervr = function () {
            var hotspots = _this.yp.krpano.get("hotspot");
            _this.krpano.call("webvr_onentervr(); vr_menu_setvisibility(true);");
            console.log("onentervr");
            proxy.postMessage("onentervr");
            for (var i in hotspots.getArray()) {
                var hotspot = hotspots.getItem(i);
                if (hotspot.name.indexOf("skin_nadirlogo") !== -1) {
                    hotspot.distorted = true;
                    hotspot.depth = 5000;
                    hotspot.vr_timeout = 1000;
                    hotspot.oy = 0;
                    hotspot.scale = 5;
                }

                if (hotspot.hotspot_type == "2") {
                    var hName = "vr" + hotspot.name;
                    var h = krpano.get("hotspot[" + hName + "]");

                    //现hotspot.sprite无法获取,替代方案为hotspot下添加layer/plugin
                    //当hotspot下添加了layer/plugin时无法显示热点,
                    //替代方案是重新创建一个hotspot,如果可以解决在解决
                    if (!h) {
                        h = krpano.addhotspot(hName);

                        h.keep = true;
                        h.onloaded = hotspot.onloaded;
                        h.url = hotspot.url;
                        h.edge = hotspot.edge;
                        h.crop = hotspot.crop;
                        h.oy = hotspot.oy;
                        h.isgif = hotspot.isgif;
                        h.distorted = hotspot.true;
                        h.depth = 5000;
                        h.vr_timeout = 1000;
                        h.scale = 5;
                        h.framewidth = hotspot.framewidth;
                        h.frametime = hotspot.frametime;
                        h.frameheight = hotspot.frameheight;
                        h.frame = hotspot.frame;
                        h.onclick = hotspot.onclick;

                        h.ath = hotspot.ath;
                        h.atv = hotspot.atv;

                        tempHotspots.push(h);
                    } else {
                        h.visible = true;
                    }

                    // krpano.get("layer[layer" + hotspot.name + "]").parent = null;

                    // krpano.get("layer[layer" + hotspot.name + "]").parent = null;
                }
            }

            for (var i in onentervrs) {
                if (typeof onentervrs[i] === "function") {
                    onentervrs[i]();
                }
            }
        };
        webVR.onexitvr = function () {
            var hotspotArr = _this.yp.krpano.get("hotspot").getArray(),
                hotspot;
            _this.krpano.call("webvr_onexitvr();");
            console.log("onexitvr");
            proxy.postMessage("onexitvr");
            for (var i in hotspotArr) {
                hotspot = hotspotArr[i];
                if (hotspot.name.indexOf("skin_nadirlogo") !== -1) {
                    hotspot.distorted = false;
                    hotspot.depth = 1000;
                    hotspot.vr_timeout = undefined;
                    hotspot.oy = 0;
                    hotspot.scale = 1;
                }


                if (hotspot.hotspot_type == "2") {
                    var hName = "vr" + hotspot.name;
                    var h = krpano.get("hotspot[" + hName + "]");

                    h && (h.visible = false);
                }
            }

            for (var i in onexitvrs) {
                if (typeof onexitvrs[i] === "function") {
                    onexitvrs[i]();
                }
            }
        }
    };

    funs.on = function (type, fun) {
        if (type == "exitvr") {
            onexitvrs.push(fun);
        } else if (type == "entervr") {
            onentervrs.push(fun);
        }
    }

    funs.remove = function (type, fun) {
        if (type == "exitvr") {
            var index = onexitvrs.indexOf(fun);

            if (index > -1) {
                onexitvrs.splice(index, 1);
            }
        } else if (type == "entervr") {
            var index = onentervrs.indexOf(fun);

            if (index > -1) {
                onentervrs.splice(index, 1);
            }
        }
    }

    funs.enterVr = function () {
        return this.krpano.call("plugin[WebVR].enterVR()");
    };

    funs.xml = config.krpanoPath + "skin/plugin/webvr.xml";

    funs.exitVr = function (name) {
        return this.krpano.call("plugin[WebVR].exitVR()");
    };

    funs.onnewpano = function () {
        setTimeout(function () {
            var webVR = this.krpano.get("plugin[WebVR]");
            if (webVR.isenabled) {
                webVR.onentervr();
            }

            for (var i = 0; i < 18; i++) {
                this.krpano.removehotspot("p" + i);
                this.krpano.removehotspot("p" + i + "_thumb");
                this.krpano.removehotspot("p" + i + "text");
            }
            this.krpano.call("loadscene_vr()");
        }.bind(this), 1000);

    }

    funs.onnewscene = function () {
        for (var i in tempHotspots) {
            this.krpano.removehotspot(tempHotspots[i].name);
        }

        tempHotspots = [];
    }

    return funs;
});
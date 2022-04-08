define("method/reload", ["proxy", "config"], function(proxy, config) {
    var DEFAULT_OPTION = {
        callback: {
            onSceneAdd: undefined,
            onSceneRemove: undefined
        },
        data: undefined
    };

    function Reload(option) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
        this.data = [];
    }

    Reload.name = "reload";
    var funs = Reload.prototype;

    funs.initPanoXml = function(option) {
        return option;
    }

    funs.loadPano = function(option) {

        option = this.initPanoXml(option);
        var xml = option.xml;
        if (!option.xml) {
            if (typeof option.onloaderror === "function") option.onloaderror.call(this.yp);
            return;
        }

        this.yp._cacheData = [];
        if (typeof option.onloading === "function") option.onloading.call(this.yp);
        var tempOnnewscene = this.yp.krpano.get("events[skin_plugin_vr]").onnewscene;
        // this.yp.events.onnewscene = undefined;
        this.method.scene.getCurrScene().id = null;

        this.yp.krpano.get("events[skin_plugin_vr]").onnewscene = function() {
            this.yp.callwith("onLoadData", yp.data.loadName.join(","), function(data) {
                var scene = this.yp.krpano.xml.scene;
                this.yp.defaultData = data;
                var pluginsName = this.yp.data.loadName;
                var plugins = this.yp.plugin;
                for (var i = 0; i < pluginsName.length; i++) {
                    if (plugins[pluginsName[i]] && typeof plugins[pluginsName[i]].onnewpanodata === "function") {
                        try {
                            plugins[pluginsName[i]].onnewpanodata.call(plugins[pluginsName[i]], data[pluginsName[i]]);
                        } catch (e) {
                            logger.warn(e);
                        }
                    }

                    // if (plugins[pluginsName[i]] && typeof plugins[pluginsName[i]].onNewSceneCacheData === "function") {
                    //     this.yp._cacheData[scene] = this.yp._cacheData[scene] || {}
                    //     this.yp._cacheData[scene][pluginsName[i]] = plugins[pluginsName[i]].onNewSceneCacheData();
                    // }
                }

                if (this.yp.callback.onnewpanodata === "function") {
                    this.yp.callback.onnewpanodata.call(this.yp, data);
                }
                this.yp.krpano.get("events[skin_plugin_vr]").onnewscene = tempOnnewscene;
                option.url && (updateUrl(option.url, data.name));



                if (typeof option.onloaded === "function") option.onloaded.call(this.yp, data);

                this.yp._cacheData = {};

                //清楚缓存
                var plugins = this.yp.plugin;

                for (var i in plugins) {
                    if (plugins[i] && typeof plugins[i].onNewSceneCacheData === "function") {
                        plugins[i].onNewSceneCacheData();
                    }
                }

            }.bind(this))
        }.bind(this);

        loadPano(this.yp.krpano, xml)

    }

    function loadPano(krpano, xml) {
        krpano.call('loadpano(' + xml + ', onstart=loadscene(get(scene[0].name), null, MERGE, ZOOMBLEND(2))&skin_settings.switch_starview=false, MERGE, ZOOMBLEND(2))');
    }

    funs.callwith = function(type, data) {
        if (this.option.callback && typeof this.option.callback[type] === "function") {
            this.option.callback[type].call(this, data);
        }
    };

    return funs;
});
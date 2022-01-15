/*
 krpano HTML5 Javascript Plugin Example
 */

function krpanoplugin() {
    var local = this;
    var krpano = null;
    var yp;
    var event;

    local.registerplugin = function(krpanointerface, pluginpath, pluginobject) {
        yp = krpanointerface.yt_pano;
        yp.krpano = krpanointerface;
        // yp.plugin = pluginobject;
        yp.settings = yp.krpano.get("skin_settings");
        var xmlInitCount = 0;
        var fns = {};
        yp.require("method/util");
        var event = yp.method.util.createItem("events", "skin_plugin_vr");
        yp.initPano(function(data, relevance) {
            // console.log(data, relevance);
            var si = setInterval(function() {
                if (!isFinsh()) {
                    console.log(xmlInitCount);
                    return;
                } else {
                    clearInterval(si);
                }

                function init(fn, d) {
                    try {
                        if (typeof fn.init === "function")
                            fn.init(d);
                    } catch (e) {
                        logger.error(fn + "加载失败", e);
                    }
                }

                for (var i in yp.method) {
                    init(yp.method[i]);
                }

                for (var i in yp.plugin) {
                    var d;
                    if (i != "toolbar") {
                        if (relevance[i]) {
                            if (typeof relevance[i].data === "function") {
                                d = relevance[i].data.call(yp, data[relevance[i].loadName]);
                            } else {
                                d = $.extend(true, {}, data[relevance[i].loadName], relevance[i].data);
                            }

                            relevance[i].data = d;
                            init(yp.plugin[i], d);
                        } else {
                            init(yp.plugin[i]);
                        }
                    }
                }

                for (var i in yp.js) {
                    init(yp.js[i]);
                }

                var toolbar = yp.plugin["toolbar"];

                toolbar && typeof toolbar.init === "function" && toolbar.init();

                yp.initEvent();
                yp.events.onnewscene();
                yp.events.onnewpano();
                yp.callback('onReady')

                event.onnewscene = function() {

                    console.log("onnewscene");
                    var scene = this.krpano.xml.scene;
                    console.log(this.krpano.xml.scene);

                    var cacheList = [];
                    var loadList = [];

                    for (var i in this.plugin) {
                        var plugin = this.plugin[i];

                        if (typeof plugin.onNewSceneCacheData === "function") {
                            this._cacheData[yp._currScene] = this._cacheData[yp._currScene] || {}
                            this._cacheData[yp._currScene][i] = plugin.onNewSceneCacheData();

                            if (this._cacheData[scene] && this._cacheData[scene][i]) {
                                cacheList.push(i);
                                try {
                                    plugin.onNewSceneData(this._cacheData[scene][i]);
                                } catch (e) {
                                    logger.warn(e);
                                }
                                continue;
                            }
                        }

                        if (typeof yp.plugin[i].onNewSceneData === "function") {
                            loadList.push(i);
                        }
                    }

                    yp.callwith("onLoadData", loadList.join(","), function(data) {
                        for (var i in loadList) {
                            if (data[loadList[i]]) {
                                try {
                                    this.plugin[loadList[i]].onNewSceneData(data[loadList[i]]);
                                } catch (e) {
                                    logger.warn(e);
                                }
                            }
                        }
                    }.bind(this));

                    this._currScene = this.krpano.xml.scene;
                }.bind(yp);
            }.bind(this), 500);
        });

        addAll("method", fns, yp.method);
        addAll("plugin", fns, yp.plugin);

        event.onxmlcomplete = function() {
            xmlInitCount = 1;
        }

        var include = "";

        for (var i in fns) {
            var fn = fns[i];

            if (fn && fn.xml) {
                include += "<include url=\"" + fn.xml + "\" />";
            }
        }

        yp.krpano.call("loadxml('<krpano>" + include + "</krpano>')");

        function isFinsh() {
            return xmlInitCount == 1
        }

        yp.krpano.call("loadscene(get(scene[0].name))");
    };

    function addAll(name, list, list2) {
        for (var i in list2) {
            list[name + i] = list2[i];
        }
    }

    local.unloadplugin = function() {
        if ($.isFunction(yp.option.callback.unLoadPlugin)) {
            yp.option.callback.unLoadPlugin();
        }

        yp.krpano = null;
        yp.plugin = null;
    };

    local.onresize = function(width, height) {
        return callback(yp.option.callback.onResize, [width, height]);
    };

    function callback(fn, params) {
        if ($.isFunction(fn)) {
            return fn.apply(yp, params);
        }
    }
}
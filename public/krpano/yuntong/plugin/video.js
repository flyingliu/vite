define(['jquery', 'vue', 'layer', 'template', 'proxy', 'iscroll', 'config'], function ($, Vue, layer, template, proxy, IScroll, config) {
    var hotspotArr = []
    var hotComment
    var hotspot
    var flag = false
    var currentHotspot
    var shopTextScroll
    var layerIndex = {}
    var porxy
    var panoId
    var isMb
    var i
    var elementTo = undefined

    var cowryHtml = '<div id="video">\
        <img class="bofang" :src="bofang" v-show="isPlay==0"><img class="videoPic" :src="poster" v-show="isPlay==0">\
        <video class="videoMP4" :src="videoUrl" width="100%" height="100%" loop playsinline x5-playsinline></video>\
    <div>'

    var DEFAULT_OPTION = {
        element: $(cowryHtml),
        align: 'center',
        isMove: false,
        x: 0,
        y: 0,
        style: null,
        isEdit: false,
        formElement: $('body')
    }

    function video(option) {
        var _this = this
        this.option = $.extend(true, {}, DEFAULT_OPTION, option, {
            callback: {
                onClick: function (data) {
                    currentHotspot = this
                    if (currentHotspot.vue.isPlay == 0) {
                        $($(currentHotspot.vue.$el).find("video")[0]).show();
                        $(currentHotspot.vue.$el).find("video")[0].play()
                        // $($(currentHotspot.vue.$el).find(".bofang")[0]).hide();
                        // $($(currentHotspot.vue.$el).find(".videoPic")[0]).hide();
                        currentHotspot.vue.isPlay = 1
                    } else {
                        $($(currentHotspot.vue.$el).find("video")[0]).hide();
                        $(currentHotspot.vue.$el).find("video")[0].pause()
                        // $($(currentHotspot.vue.$el).find(".bofang")[0]).show();
                        // $($(currentHotspot.vue.$el).find(".videoPic")[0]).show();
                        currentHotspot.vue.isPlay = 0
                    }
                    console.log(1111111)
                },
                onLoaded: function (data) {
                    // this.hotspot.edge = "lefttop"
                    var videoData = data.data;
                    currentHotspot = this
                    currentHotspot.hotspot.zoom = true
                    currentHotspot.hotspot.distorted = true
                    currentHotspot.vue = new Vue({
                        el: currentHotspot.element[0],
                        data: function () {
                            return {
                                videoData:videoData,
                                videoUrl:"",
                                poster:"",
                                bofang:"",
                                isPlay:""
                            }
                        },
                        watch:{
                        },
                        methods: {
                        },
                        mounted: function () {
                            var _this = this
                            currentHotspot.hotspot.rx = parseInt(_this.videoData.rx)
                            currentHotspot.hotspot.ry = parseInt(_this.videoData.ry)
                            currentHotspot.hotspot.rz = parseInt(_this.videoData.rz)
                            currentHotspot.hotspot.scale = parseFloat(currentHotspot.data.scale).toFixed(1)
                            this.poster = _this.videoData.fileImgUrl
                            this.isPlay = _this.videoData.isPlay
                            this.videoUrl = "//file.aoliliya.com/" + _this.videoData.fileMp4Url
                            for (var i in currentHotspot.yp.method.icon.getIconPackage()) {
                                if (currentHotspot.yp.method.icon.getIconPackage()[i].type ==4) {
                                    for (var j in currentHotspot.yp.method.icon.getIconPackage()[i].styleList) {
                                        if (currentHotspot.yp.method.icon.getIconPackage()[i].styleList[j].iconid == data.data.tbId) {
                                            this.bofang = currentHotspot.yp.method.icon.getIconPackage()[i].styleList[j].thumb
                                        }
                                    }
                                }
                            }
                            if (browserFn().mobile) {
                                currentHotspot.hotspot.width = parseInt(_this.videoData.width)
                                currentHotspot.hotspot.height = parseInt(_this.videoData.height)
                                $($(_this.$el)[0]).css({"width":parseInt(_this.videoData.width)/100 + "rem","left":parseInt(_this.videoData.width)*-1/100 + "rem"})
                                $($(_this.$el)[0]).css({"height":parseInt(_this.videoData.height)/100 + "rem","top":parseInt(_this.videoData.height)*-0.5/100 + "rem"})
                                $($(_this.$el)[0]).css("opacity",parseInt(_this.videoData.transparency)/100)
                                $($(_this.$el).find("video")[0]).css("opacity",parseInt(_this.videoData.transparency)/100)
                            } else {
                                currentHotspot.hotspot.width = parseInt(_this.videoData.width)
                                currentHotspot.hotspot.height = parseInt(_this.videoData.height)
                                $($(_this.$el)[0]).css({"width":parseInt(_this.videoData.width),"left":parseInt(_this.videoData.width)*-1})
                                $($(_this.$el)[0]).css({"height":parseInt(_this.videoData.height),"top":parseInt(_this.videoData.height)*-0.5})
                                $($(_this.$el)[0]).css("opacity",parseInt(_this.videoData.transparency)/100)
                                $($(_this.$el).find("video")[0]).css("opacity",parseInt(_this.videoData.transparency)/100)
                            }
                            
                            setTimeout(function(){
                                var start = $(_this.$el).find("video")[0];
                                load(start);
                                if (_this.videoData.isPlay == 1) {
                                    _this.isPlay = 1
                                    $($(_this.$el).find(".bofang")[0]).hide();
                                    $($(_this.$el).find(".videoPic")[0]).hide();
                                    $(_this.$el).find("video")[0].play()
                                }
                                $(_this.$el).find("video")[0].onpause = function(){
                                    _this.isPlay = 0
                                    // $($(_this.$el).find(".bofang")[0]).show();
                                    // $($(_this.$el).find(".videoPic")[0]).show();
                                    $($(_this.$el).find("video")[0]).hide();
                                }
                            })
                        }
                    })
                    hotspotArr.push(this)
                },
                onAddHotspot: function () {
                    currentHotspot = this
                }
            }
        })
        this.data = {}
    }

    var funs = video.prototype

    funs.deps = ['plugin/groups', 'plugin/toolbar', 'method/hotspot', 'method/login', 'method/util']

    funs.init = function (data) {

        var yp = this.yp
        var _this = this

        isMb = yp.method.util.browser().mobile
        if (data) {
            this.option.data = this.method.hotspot.finishDataList(data)
        }
        panoId = this.yp.option.panoId
        yp.element.append(cowryHtml)
        for (var i in this.option.data) {
            this.option.data[i].iconId = null
            this.option.data[i].url = config.codePath + '/krpano/skin/img/background.png'
        }
        hotComment = _this.video = _this.method.hotspot.register('video', _this.option)
        // proxy.relSelect({}, function (data) {
        //     if (data.success) {
        //         if (data.data[3].hongbao_hotspot) {
        //             if (data.data[3].hongbao_hotspot.isOpen == '1') {
        //                 hotComment = _this.video = _this.method.hotspot.register('video', _this.option)
        //             }
        //         }
        //     } else {
        //         layer.msg(data.errMsg)
        //     }
        // })
    }

    funs.getLink = function (name) {
        return this.video.getHotspot(name)
    }
 
    funs.onnewpanodata = funs.onNewSceneData = function (data) {
        for (var i in data) {
            data[i] = this.method.hotspot.finishData(data[i])
            data[i].iconId = null
            data[i].url = config.codePath + '/krpano/skin/img/background.png'
            hotspot = this.video.addHotspot(data[i])
            hotspot.hotspot.visible = !this.option.isEdit
        }
    }

    funs.onNewSceneCacheData = function () {
        this.cacheData = []
        for (var i in hotspotArr) {
            this.cacheData.push(hotspotArr[i].data)
        }
        hotspotArr = []
        return this.cacheData
    }

    function load (e) {
        if (browserFn().ios) {
            $(window).one("touchstart", function () {
            var play = e.play();
            if (play) {
                play.then(function () {
                    e.pause();
                }.bind(this));
            }
            }.bind(this));
        }
    }

    return video
})
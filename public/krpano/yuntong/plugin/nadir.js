define("plugin/nadir", ["jquery", "template",'config'], function ($, template,config) {

    var TEMPLATE = '<div class="layernadir" id="layernadir">\
            <div class="patchcon">\
                <ul class="path-tab">\
                    <li class="nadirSwitch">\
                        <p>开启功能：</p>\
                        <my-switch class="switch" size="md" v-model="isOpen" :item="isOpen" @switchbtn="switchbtn" color="blue"></my-switch>\
                    </li>\
                    <li class="link" data-id="<%=data.id%>" style="display: list-item">\
                        <div class="img-name">\
                            <div class="cropped">\
                                <img :src="nadir.landpic" align="absmiddle" style="width:200px;border-radius:50%;height:200px;" class="comlei">\
                            </div>\
                            <div class="img-tip">\
                                <i class="addplus"></i>\
                                <a href="javascript:void(0)" class="upload-img"></a>\
                                <input type="file" class="nadirFile" name="file" id="upload-file" />\
                            </div>\
                            <div class="upall">\
                                <div class="imageBox">\
                                    <div class="thumbBox"></div>\
                                </div>\
                                <div class="action">\
                                    <div class="new-contentarea tc"></div>\
                                    <input type="button" id="btnZoomIn" class="Btnsty_peyton">\
                                    <input type="button" id="btnZoomOut" class="Btnsty_peyton">\
                                    <input type="button" id="btnCrop" class="Btnsty_peyton">\
                                </div>\
                            </div>\
                        </div>\
                    </li>\
                </ul>\
            </div>\
            <div class="caoz-btn">\
                <button type="button" class="submit btn-com">保存</button>\
                <button type="button" class="reset btn-com">重置</button>\
            </div>\
        </div>';
    var DEFAULT_OPTION = {
        template: TEMPLATE,
        isEdit: false
    };

    function Nadir(options) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, options);
        this.data = this.option.data;
    }

    var fn = Nadir.prototype;
    fn.deps = ["method/nadir"];

    fn.init = function (data) {
        var mynadir = this.yp.plugin.nadir.getNadir();
        var isEdit = this.option.isEdit;
        this.data = data;
        if (isEdit) {
            var html = $(template(this.option.template, {data: mynadir}));
            this.yp.element.append(html);
        }

    };

    fn.onnewpano = function () {
        var mynadir = this.getNadir();
    };

    fn.getNadir = function (data) { 
        var mynadir = {}
        var _this = this;
        if (data) {
        	this.yp.defaultData.nadir.isClose = data.isClose;
        	this.yp.defaultData.nadir.logo = data.logo;
        }
        if (this.yp.defaultData.nadir) {
            var scene = this.yp.defaultData.nadir;
            mynadir.landswitch = scene.isClose ? false : true;
            mynadir.landpic = scene.logo || "/group1/M00/30/E1/rBISAlsWa9qATCjmAAHXv8UCA0U088.png";
            mynadir.landlink = "#";
            mynadir.skyswitch = scene.nadirlogo_sky;
            mynadir.skypic = scene.nadirlogo_sky_url || "/group1/M00/30/E1/rBISAlsWa9qATCjmAAHXv8UCA0U088.png";
            mynadir.skylink = "#";

            this.settings.nadirlogo_default_open_url = "#";
            this.settings.nadirlgo_bg_url = config.codePath + "/krpano/nadirbg.png";
            this.settings.nadirlogo_default_url = config.filePath + "/group1/M00/30/E1/rBISAlsWa9qATCjmAAHXv8UCA0U088.png";
			// group1/M00/01/46/wKgBA1sQ_BeAPPgfAAEjhjWkQa4583.png
			if (this.yp.defaultData.nadir.isClose == "0") {
            	this.method.nadir.set(mynadir.landpic, mynadir.landlink, false); //(pic, url, skyFlag) 
			}

        }
        return mynadir;
    }


    return Nadir;
});
define("method/nadir",["config"] ,function (config) {
    var funs = {name: "nadir"};

    /**
     * 设置补天/地图片
     * @param pic   显示的图片地址
     * @param url   单击后跳转地址
     * @param skyFlag   true表示设置补天，false表示设置补地
     */
    funs.set = function (pic, url, skyFlag) {
    	var pic = config.filePath + pic;
        this.krpano.call("skin_set_nadir(" + pic + "," + url + "," + skyFlag + ")");
    };

    funs.get = function () {
        var v = {};

        //查询补地
        v.urlLand = this.settings.nadirlogo_land_url;
        v.linkLand = this.settings.nadirlogo_land_open_url;
        v.isOpneLand = this.settings.nadirlogo_land === "true" ? true : false;

        //查询补天
        v.urlSky = this.settings.nadirlogo_sky_url;
        v.linkSky = this.settings.nadirlogo_sky_open_url;
        v.isOpneSky = this.settings.nadirlogo_sky === "true" ? true : false;

        v.defaultUrl = this.settings.nadirlogo_sky_url;
        v.defaultLogo = this.settings.nadirlogo_default_url;

        return v;
    };

    /**
     * 显示/隐藏 补天/地 图片
     * @param flag  true显示，false隐藏
     * @param skyFlag
     */
    funs.swith = function (flag, skyFlag) {
        this.krpano.call("skin_nadirlogo_swith_visible(" + flag + "," + skyFlag + ")");
    };

    funs.resize = function (skyFlag) {//重置补地图片
        this.krpano.call("skin_nadirlogo_resize(" + skyFlag + ")");
    };

    funs.getDefault = function () {//获取默认logo和link
        return {url: this.settings.nadirlogo_default_url, link: this.settings.nadirlogo_default_open_url};
    };

    funs.xml = config.krpanoPath + "skin/plugin/nadirlogo.xml";

    return funs;
});

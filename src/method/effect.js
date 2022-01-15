define("method/effect", function () {
    var funs = {name: "effect"},
        pluginName = "snow",
        DEFALUE = {
            mode: "rain",
            imageurl: "",
            imagescale: "1",
            flakes: "1500",
            color: "0xFFFFFF",
            floor: "0.7",
            speed: "1.0",
            spreading: "1",
            shake: "4.0",
            speedvariance: "2.0",
            wind: "3",
            winddir: "0",
            rainwidth: "1",
            rainalpha: "1",
            visible: true
        };

    funs.switch = function (flag) {
        if (this.plugin) {
            this.plugin.visible = flag;
        }
    };

    /**
     * 设置特效
     *
     * @param effectObj 基本参数
     * @param size 速率,计算大中小   1:小,2:中,3大
     */
    funs.set = function (effectObj, size) {
        this.initPlugin();
        if (typeof effectObj === "object" && effectObj.mode) {
            this.options = $.extend(true, {}, DEFALUE, effectObj);
        } else if (typeof effectObj === "string") {
            this.options = $.extend(true, {}, DEFALUE, {mode: "image", imageurl: effectObj});
        } else {
            logger.warn("特效,参数错误");
            this.switch(false);
            return;
        }

        if (this.options.mode == "image" && !this.options.imageurl) {
            logger.warn("特效,参数错误");
            this.switch(false);
            return;
        }


        if (3 >= size && size > 0) {
            this.options.flakes = (this.options.mode == "image" ? 1000 : 1500) * size;
            this.options.speed = size * size + 1;
            this.options.wind = 1 * size;
        } else if (size == 0) {
            this.switch(false);
        } else if (size) {
            logger.warn("特效,参数错误");
            this.switch(false);
            return;
        }

        $.extend(this.plugin, this.options);
        // this.plugin.reloadurl();
    };
    funs.get = function () {
        var resObj = {};

        for (var i in DEFALUE) {
            resObj[i] = this.plugin[i];
        }

        return resObj;
    };

    funs.initPlugin = function () {
        // this.krpano.removeplugin(pluginName);
        // if(this.plugin)
        // this.plugin.removeobject();
        // this.plugin = {};
        if (!this.plugin) {
            this.plugin = this.krpano.addplugin(pluginName);

            this.plugin.url = "%SWFPATH%/plugins/snow.js";
            this.plugin.enable = true;
            this.plugin.keep = true;
            this.plugin.visible = false;
        }

        this.plugin.updatepos()
    };

    return funs;
});

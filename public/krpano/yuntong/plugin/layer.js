define("plugin/layer", ["jquery", "template", "layer", "logger"], function ($, template, layer, logger, undefined) {

    /**
     * 弹窗插件
     * 一个group只能打开一个弹窗
     * @param option
     * @constructor
     */
    function Layer(option) {
        this.option = option;
        this.data = {};
    }

    var funs = Layer.prototype;

    /**
     * 打开一个弹窗
     * @param option 该弹窗的参数
     */
    funs.open = function (option) {
        if (!this.ckeck(option)) return;

        var group = option.group;
        var childe = option.childe;
        delete option.group;

        option = $.extend(true, {}, this.option[group], option);
        option.id = group;

        if (!((childe && this.data[group] && childe == this.data[group].childe)) || !childe) {
            var index = this.close(group, true);

            setTimeout(function () {
                this.data[group] = {
                    index: layer.open(option),
                    childe: childe,
                    option: option
                };
            }.bind(this), index);
        }
    };

    /**
     * 关闭弹窗
     * @param group 弹窗名称
     * @param flag 是否快捷关闭
     */
    funs.close = function (group, flag) {
        if (!group) return;

        if (this.data[group]) {
            var ele = $("#layui-layer" + this.data[group].index);
            var option = this.data[group].option;
            var index = this.data[group].index;
            flag = option.close && !flag;

            if (ele[0]) {
                if (flag) {
                    ele.addClass(option.close);

                    var timer = setTimeout(function () {
                        layer.close(index);
                        clearTimeout(timer);
                    }.bind(this), option.closeTime || 500);
                } else {
                    layer.close(index);
                }
            } else {
                logger.info("未开启group=" + group + "的layer")
            }

            delete this.data[group];
            return flag ? option.closeTime || 500 : 0;
        }

        return 0;
    };

    funs.ckeck = function (option) {
        if (!option.group) {
            logger.error("参数必须含有group");
            return false;
        } else {
            return true;
        }

    };

    /**
     * 添加option
     * @param group 分组名称
     * @param option 通用参数
     */
    funs.setOption = function (group, option) {
        if (this.option[group]) logger.info("group=" + group + "已经添加,原有option=" + option);

        this.option[group] = $.extend(true, {}, this.option[group], option);
    };

    return Layer;
});

define("plugin/count", ["jquery", "proxy"], function ($, proxy) {
    var DEFAULT_OPTION = {
        count: true,
        url: "https://pano.aoliliya.com/count/addCount"
    };

    function Count(option) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
        this.data = this.option.data;
    }

    var funs = Count.prototype;

    funs.getData = function () {
        return this.data;
    };

    funs.init = function () {
        proxy.addUrl("count", this.option.url);

        if (this.option.count && this.yp.option.panoId) {
            proxy.count({
                panoId: this.yp.option.panoId
            });
        }
    };

    return Count;
});
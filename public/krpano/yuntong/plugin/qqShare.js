define('plugin/qqShare', ['jquery','config'], function ($,config) {
    function Share() {}

    var funs = Share.prototype

    var DEFAULE_OPTION = {
        title: '奥里里亚，在你看不到的地方',
        summary: '奥里里亚，感觉不到只因身在此山中',
        pic: 'http://qzonestyle.gtimg.cn/aoi/sola/20150617094556_OvfOpoRKRB.png',
        url: location.href,
        WXconfig: {
            swapTitleInWX: true,
            appId: '',
            timestamp: '',
            nonceStr: '',
            signature: ''
        }
    }

    funs.init = function () {
        var _this = this
        var data = this.yp.defaultData.share
        _this.options = $.extend(DEFAULE_OPTION,{
            title: data.title,
            summary: data.content,
            pic: config.filePath + data.thumb,
        })
        if (typeof define === 'function' && define.amd) {
            // AMD
            require(['//qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js'], qqFn)
        } else {
            $.getScript('//qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js', qqFn)
        }
        function qqFn(setShareInfo) {
            setShareInfo(_this.options);
        }

    }

    return Share
})
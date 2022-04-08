define("plugin/switcher", ["jquery", "template"], function ($, template) {
    var DEFAULT_OPTION = {
        // data: undefined
        isEdit: false,
        template: '<ul class="switcher">\
            <%for (var i in data) {%>\
                <%=data%>\
                <li data-id="<%=i%>" class="switch_<%=i%>"><%=i%><input type="checkbox" value="<%=data[i]%>" <%if (data[i] == 1) {%>checked<%}%> ></li>\
            <%}%>\
        </ul>',
        appTemplate: '<ul class="switch-list">\
            <%for (var i in data) {%>\
                <li data-id="<%=i%>" class="switch_<%=i%> <%if (data[i] == 1) {%>curr<%}%> "><i></i><span><%=i%></span><input type="checkbox" value="<%=data[i]%>" <%if (data[i] == 1) {%>checked<%}%> ></li>\
            <%}%>\
        </ul>'
    };

    var autotime = 60000 * 1;
    var autotimer;

    function Switcher(option) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
    }

    var funs = Switcher.prototype;
    funs.deps = [ "plugin/hotspot", "method/music", "method/gyro", "method/autorotate"];

    funs.onNewSceneData = function (data) {
        this.data = data;
    };

    funs.init = function (data) {
        var _this = this;
        var data = data || this.option.data;
        data.webvr = 0;
        this.data = data;
        var html = $(template(this.option.template, {data: data}));

        var element = this.option.element || this.yp.element;
        if ($(".switcher").length > 0) {
            html = $(template(this.option.appTemplate, {data: data}));
            $(".switcher").html(html);
        } else {
            element.append(html);
        }

        var isEdit = this.option.isEdit;

//      if (!isEdit) {
//          setTimeout(function () {
//              for (var i in data) {
//                  _this.switchOff(i, !!data[i]);
//              }
//              if (!this.yp.defaultData.plugin.comments.show) {
//                  this.yp.plugin.comments.switch(false);
//              }
//          })
//      } else {
//          this.yp.plugin.comments.switch(false);
//      }

    }

    funs.onnewpanodata = function (data) {
        this.init(data);
    }

    //name:开关的名字,type:1表示开，0表示关

    funs.switchOff = function (name, type) {
        var _this = this;
        switch (name) {
            case 'hotspot':
                if (this.yp.plugin.hotspots) {
                    this.yp.plugin.hotspots.switch(type);
                    this.krpano.skin_settings.switch_hotspot = type;
                    break;
                }
            case 'gyro':
                if (type) {
                    this.krpano.skin_settings.switch_gyro = true;
                    this.yp.method.gyro.switch(true);
                } else {
                    this.krpano.skin_settings.switch_gyro = false;
                    this.yp.method.gyro.switch(false);
                }
                break;
            case 'music':
                if (type) {
                    this.krpano.skin_settings.switch_music = true;
                    this.yp.plugin.music.play();
                } else {
                    this.krpano.skin_settings.switch_music = false;
                    this.yp.method.music.pause();
                }
                break;
            case 'starview':
                this.krpano.skin_settings.switch_starview = false;

                break;
            case 'autorotate':
                this.data.autorotate = type;
                this.yp.method.autorotate.switch(type);
                break;
            case 'comment':
                if (typeof _this.yp.plugin.comments === "undefined") return;
                _this.yp.plugin.comments.switch(type);
                _this.yp.settings.switch_comment = type;
                break;
            default:
                return "未知组件类型";
        }
    }

    funs.getSwitch = function () {
        var result = {};
        var gyro = this.krpano.skin_settings.switch_gyro;
        var music = this.krpano.skin_settings.switch_music;
        var comment = this.krpano.skin_settings.switch_comment;
        var hotspot = this.krpano.skin_settings.switch_hotspot;
        var starview = this.krpano.skin_settings.switch_starview;
        var autorotate = this.krpano.skin_settings.switch_autorotate;
        result.gyro = gyro;
        result.music = music;
        result.comment = comment;
        result.hotspot = hotspot;
        result.starview = starview;
        result.autorotate = autorotate;
        return result;
    }

    return Switcher
});
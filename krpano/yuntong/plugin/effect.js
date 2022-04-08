define("plugin/effect", ["jquery", "template", "config"], function($, template, config) {
    var TEMPLATE = '<div id="layersnow">\
                    <div class="layersnow">\
                        <h5 class="snowtitle boxflex"><a class="btna" @click="setTabs(0)" :class="{active:!tabs}">系统</a><a class="btna"  @click="setTabs(1)" :class="{active:tabs}">自定义</a></h5>\
                        <template v-if="!tabs">\
                            <ul class="snow_list">\
                                <li>\
                                    <label class="default_type">\
                                        <input name="snow_type" :value="0" type="radio" v-model="picked"> 无</label>\
                                </li>\
                                <li v-for="item in list">\
                                    <label class="default_type">\
                                        <input name="snow_type" :value="item.id" type="radio" v-model="picked"> {{item.name}}</label>\
                                </li>\
                            </ul>\
                        </template>\
                        <template v-else>\
                            <h5 class="snowtitle boxflex"><a class="btna btnisnowadd" @click="btnisnowadd">新增特效</a></h5>\
                            <div class="snowscroll">\
                            <ul class="snow_list full">\
                                <li>\
                                    <label class="default_type">\
                                        <input name="snow_type" :value="0" type="radio" v-model="picked"> 无</label>\
                                </li>\
                                <li v-for="item in zdyList">\
                                    <label class="default_type">\
                                        <input name="snow_type" :value="item.id" type="radio" v-model="picked"> {{item.name}}</label>\
                                        <i class="iconfont posi" @click="changsnow(item)">&#xe612;</i>\
                                        <i class="iconfont del" @click="deletesnow(item,$index)">&#xe60f;</i>\
                                </li>\
                            </ul>\
                            </div>\
                        </template>\
                        <div class="snow_footer">\
                            <button class="applyall" @click="applyall">应用到所有场景</button>\
                        </div>\
                    </div>\
                    <div class="layersnowadd hide" id="layersnowadd">\
                        <ul class="snow_auto">\
                            <li class="addmyeffect">\
                                <p><input maxlength="10" placeholder="特效名称"  v-model="currChange.name" /></p>\
                            </li>\
                            <li>\
                                <div class="for_img snowimgadd" :class="{addimg:!currChange.imageurl}">\
                                    <img class="snow_photo" :src="filePath + currChange.imageurl" v-if="currChange.imageurl" alt="">\
                                </div>\
                            </li>\
                            <li class="hide">\
                                <p class="snow_comment">上传的图片需为小于1M的PNG格式</p>\
                            </li>\
                        </ul>\
                    </div>\
                </div>';
    var krpano;
    var DEFAULT_OPTION = {
        template: TEMPLATE,
        isEdit: false
    };

    function Snow(option) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
        this.data = this.option.data;
    }

    var funs = Snow.prototype;
    funs.deps = ["method/effect"];

    funs.init = function(data) {
        var _this = this;
        this.data = data || this.option.data;
        var isEdit = this.option.isEdit;
        if (isEdit) {
            var newData = {
                    list: this.yp.defaultData.defaultEffect,
                    zdy: this.data,
                    effectswitch: false
                }
                // var html = $(template(this.option.template, {data:newData}) );
            this.yp.element.append(this.option.template);
        } else {
            this.onNewSceneData(data);
        }
    };

    funs.onnewscene = function(data) {
        // console.log(data);
    }

    funs.onNewSceneData = function(data) {
        if(!data) return;
        if (data.effectId) {
            if (data.imageurl && data.imageurl.indexOf(config.filePath) < 0) {
                data.imageurl = config.filePath + data.imageurl;
            }
            this.method.effect.set(data);
            if (this.yp.plugin.effect.js.effect) {
                this.yp.plugin.effect.js.effect.vm.picked = data.effectId;
            }

        } else {
            this.method.effect.switch(false);
            if (this.yp.plugin.effect.js.effect) {
                this.yp.plugin.effect.js.effect.vm.picked = 0;
            }
        }
    };

    return Snow;
});
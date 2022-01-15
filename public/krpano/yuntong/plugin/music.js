define("plugin/music", ["jquery", 'config',"template"], function ($, config , template) {
    var DEFAULT_OPTION = {
        isEdit: false,
        template: '<div id="musicwapper" >\
                    <div id="mscroll" class="tdata" :class="{nodata:!music.length}">\
                        <table>\
                            <tbody id="musicbody">\
                                <tr v-for="el in music" @click.stop="chkmusic($event)" :data-id="el.id">\
                                    <td style="width:22px;"><i :class="{on:el.isDefault}" :data-checked="el.isDefault" class="ms btncheck chkmusic"></td>\
                                    <td style="width:35px;"><p class="num">{{$index+1}}</p></td>\
                                    <td style="width:128px;"><div>{{el.title}}</div></td>\
                                    <td style="width:40px;"><div>{{el.singer}}</div></td>\
                                    <td style="width:40px;"><i @click="playmusic($event)" class="ms musicItem btnplay"  :data-index="$index" :data-music="el.mp3Url" :data-id="el.id"></i>\
                                    <i class="ms btndelete" @click="removethis($index,$event)"></i></td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    </div>\
                    <footer>\
                        <input type="file" name="music" id="musicFileUpload" class="plugin-music-uploadfile">\
                        <a class="txtMusic txtTips" >正在上传音乐</a>\
                        <a class="txtMusic progressa"><span class="txtMusic progress-bara"/></span></a>\
                        <a class="btnMusic uploadMusic" >自定义背景音乐</a>\
                        <a class="btnMusic btnckd btnSave" >保存</a>\
                    </footer></div>',
        element: $("#element")
    };

    function Music(option) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
        this.data = this.option.data;
    }

    var funs = Music.prototype;

    funs.init = function(data) {
    	this.data = data;
    }

    funs.onnewpanodata = function(data) {
        this.data = data;
        this.play();
        console.log(data);
    };


    funs.play = function() {
        var _this = this;
        var tempMusic = [];
        this.data.url = config.filePath + this.data.mp3Url;
        tempMusic.push(this.data);
	    tempMusic[0] && tempMusic[0].url && _this.method.music.play(tempMusic);
    };

    return Music;
});
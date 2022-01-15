define("method/music",["config"], function (config) {
    var funs = {name: "music"},
        isStop = false;

    funs.play = function (data) {
        if (data == null) {
            //判定播放列表，存在则暂停当前播放
            if (this.krpano.musicData == null || isStop == true) return;
            this.pause();
        } else if (data && data.length > 0) {
            //更新播放列表
            this.stopMusic();
            this.krpano.musicData = data;
            this.krpano.musicIndex = 0;
            this.krpano.call("playsound(bgsnd0,'" + data[0].url + "', 1 , replay() )");
        }

        isStop = true;
    };

    funs.pause = function () {
        isStop = false;
        this.krpano.call("pausesoundtoggle(bgsnd" + this.krpano.musicIndex + ")");
    };

    funs.stopMusic = function () {
        this.krpano.call("stopallsounds(true)");
    };

    funs.getMusicType = function () {
        return isStop;
    };

    funs.xml = config.codePath + "/plugin/xml/music.xml";

    funs.init = function () {
    };

    return funs;
});
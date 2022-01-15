define("method/autorotate", function () {
    var funs = {name: "autorotate"};
    var isAutorot = true;
    var spin;

    funs.init = function () {
        spin = this.krpano.get("autorotate[spin]");
    };

    funs.onautorotateoneround = function () {
        if (!this.krpano.get("layer[skin_loadingtext]").visible) {
            this.method.scene.nextScene();
        }
    };
    funs.switch = function (flag) {
        this.krpano.call("set(skin_settings.switch_autorotate," + flag + ")");
        spin.enabled = flag;
    };

    return funs;
});
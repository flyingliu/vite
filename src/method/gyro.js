define("method/gyro", function () {
    var funs = {name: "gyro"};

    funs.switch = function (flag) {
        this.krpano.get("plugin[skin_gyro]").enabled = typeof flag === "undefined" ? true : flag;
    };

    funs.init = function () {
        this.switch(this.settings.switch_gyro);
    };

    return funs;
});
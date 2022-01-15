define("method/scene", function() {
    var DEFAULT_OPTION = {
        callback: {
            onSceneAdd: undefined,
            onSceneRemove: undefined
        },
        data: undefined
    };

    function Scene(option) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
        this.data = [];
    }

    var funs = Scene.prototype;
    funs.setData = function(data) {
        this.data = data || this.data;
    };

    funs.getScene = function(name) {
        if (name) {
            for (var i in this.data) {
                if (typeof name === "string" && this.data[i].pid == name) {
                    return this.data[i];
                } else if (typeof name === "number" && this.data[i].spaceId == name) {
                    return this.data[i];
                }
            }
        } else {
            return this.data;
        }
    };

    funs.getCurrScene = function() {
        return this.krpano.get("scene[0]");
    };

    funs.loadScene = function(name) {
        var scene = this.getScene(name);
        scene && this.krpano.call("skin_load_pano(" + scene.xml + ");");
    };

    funs.getItem = function(name) {
        return this.krpano.scene.getItem(name);
    };

    funs.addScene = function(scene) {
        this.data.push(scene);

        this.callwith("onSceneAdd", scene);
        this.yp.events.onaddscene();
    };

    funs.onnewscene = function() {
        var scene = this.getScene(this.getCurrScene().name);
        this.index = this.data.indexOf(scene);
    };

    funs.nextScene = function() {
        var index = 0;

        for (var i=0;i<this.data.length; i++) {
            if (this.getCurrScene()) {
                if (this.data[i].spaceId == this.getCurrScene().id) {
                    index = i;
                    break;
                }
            } else {
                return false;
            }
        }

        index++;

        if (index == this.data.length) {
            index = 0;
        }
        this.yp.method.scene.loadScene(this.data[index].spaceId);
    }

    funs.removeScene = function(scene) {
        var index = this.data.indexOf(scene);

        if (index > -1) {
            this.data.splice(index, 1);
            this.yp.events.onremovescene(scene);

            this.callwith("onSceneRemove", scene);
        } else {
            this.yp("删除全景失败,未找到改全景");
        }
    };

    funs.callwith = function(type, data) {
        if (this.option.callback && typeof this.option.callback[type] === "function") {
            this.option.callback[type].call(this, data);
        }
    };

    funs.onnewscene = function() {
        var item = this.getCurrScene();

        if (item && item.content) {
            var data = this.getScene(item.name);
            data && (data.content = item.content);
        }
    };

    return Scene;
});
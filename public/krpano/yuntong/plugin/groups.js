define("plugin/groups", ["jquery", "template", "config"], function($, template, config) {
    var TEMPLATE = '<div class="sceneWrap">\
					    <div class="scene-all" id="xcrolla">\
					    	<div id="xcrollacon">\
					        <%for(var i in data) {%>\
                                <%if(i==0){%>\
					            <ul class="scene-list">\
					                <%for(var j in data[i].list) {%>\
					                    <li class="scen-list" data-name="<%=data[i].list[j].pid%>">\
					                        <img src="<%=filePath%><%=data[i].list[j].thumb%>" class="scenhot">\
					                        <p class="secname"><%=data[i].list[j].title%></p>\
					                    </li>\
					                <%}%>\
					            </ul>\
                                <%}%>\
					        <%}%>\
					        </div>\
					    </div>\
					    <div class="tabshow" id="xcroll">\
					        <div class="tabTagBox">\
					            <ul class="group tabTagList">\
					                <%for(var i in data) {%>\
					                    <li class="group-list"><%=data[i].name%></li>\
					                <%}%>\
					            </ul>\
					        </div>\
					    </div>\
					    <i class="btnPush"></i>\
					</div>';
	
	var sceneList = '<%for(var i in data.list) {%>\
	                    <li class="scen-list" data-name="<%=data.list[i].pid%>">\
	                        <img src="<%=filePath%><%=data.list[i].thumb%>" class="scenhot">\
	                        <p class="secname"><%=data.list[i].name%></p>\
	                    </li>\
	                <%}%>';
	
    var myScroll;
    var myScrolla;
    var html;
    var DEFAULT_OPTION = {
        template: TEMPLATE
    };

    function Scene(option) {
        this.option = $.extend(true, {}, DEFAULT_OPTION, option);
    }

    var funs = Scene.prototype;
    funs.deps = ["method/scene", "method/util"];

    funs.getScene = function(name) {
        return this.method.scene.getScene(name);
    };

    funs.getCurrScene = function() {
        return this.method.scene.getCurrScene();
    };

    funs.loadScene = function(name) {
        this.method.scene.loadScene(name)
    };

    funs.getGroup = function() {
        return this.option.data;
    };

    funs.addScene = function(scene) {
        return this.method.scene.addScene(scene);
    };

    funs.removeScene = function(scene) {
        return this.method.scene.removeScene(scene);
    };


    funs.getSceneHtml = function(data) {
        var data = data || this.yp.defaultData.groups;
        var sceneList = [];
        for (var i in data) {
            var item = '<ul class="scene-list">';
            for (var j in data[i].list) {
                if(data[i].list[j].isFinsh) {
                    item += '<li class="scen-list" data-name="' + data[i].list[j].pid + '"><img src="' + config.filePath + data[i].list[j].thumb + '" class="scenhot"><p class="secname"><span> ' + data[i].list[j].name  + '</span></p></li>'
                }
            }
            item += '</ul>'
            sceneList.push(item);
        }
        this.sceneHtml = sceneList;
        return sceneList;
    };


    funs.init = function(data) {
        var _this = this;
        this.option.data = data || this.option.data;
        this.sceneList = [];
        for (var i in this.option.data) {
            this.sceneList = this.sceneList.concat(this.option.data[i].list);
        }

        this.method.scene.setData(this.sceneList);

        var data = this.getGroup()
        html = $(template(this.option.template, { data: data, filePath: config.filePath }));
        var element = this.option.element || this.yp.element;
        element.append(html);

        $(".group-list:first").addClass("curr");
        var length = document.getElementsByClassName("group-list").length;
        if (length < 2) {
            $(".tabshow").hide();
        }

        this.onnewscene();


    };

    funs.onnewscene = function() {

        if(this.getCurrScene()){
            html.find("li").removeClass("active");
            html.find("li[data-name=" + this.getCurrScene().name + "]").addClass("active");
        }

        this.krpano.load_scene = this.loadScene.bind(this);

        var scenes = this.yp.method.scene.getScene();
        var sceneArray = [];
        for (var i = 0; i < scenes.length; i++) {
            sceneArray[i] = this.yp.method.util.createItem("scene", scenes[i].name);
            sceneArray[i].name = scenes[i].name;
            sceneArray[i].thumburl = config.filePath + scenes[i].thumb;
        }
    }

    funs.onnewpanodata = function(data) {
        this.sceneList = [];
        for (var i in data) {
            this.sceneList = this.sceneList.concat(data[i].list);
        }

        this.method.scene.setData(this.sceneList);
        var groupList = function() {
            var groupListHtml = "";
            for (var i in data) {
                groupListHtml += '<li class="group-list"><p>' + data[i].name + '</p></li>'
            }
            return groupListHtml;
        }

        $(".tabTagList").html(groupList());
        this.getSceneHtml(data);
    }
    
    funs.refreshData = function(data) {
    	var sceneHtml = $(template(sceneList, { data: data, filePath: config.filePath }));
        $("#shop").find(".sceneWrap #xcrollacon ul").html(sceneHtml);
        this.method.scene.setData(data.list);
        this.onnewscene();
    }

    return Scene
});
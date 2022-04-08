define("plugin/scale", ["jquery", "template", 'proxy'], function($, template, proxy) {

	var krpano;
	var TEMPLATE = '<div class="layerscale" id="layerscale">\
						<p>移动鼠标，观看视角位置后<br />点击保存即可</p>\
						<p>小行星</p><my-switch class="switch" size="md" v-model="isOpen" :item="isOpen" @switchbtn="switchbtn" color="blue"></my-switch>\
						<button class="save-scale">保存</button>\
					</div>';
	var DEFAULT_OPTION = {
		template: TEMPLATE
	};

	function Scale(option) {
		this.option = $.extend(true, {}, DEFAULT_OPTION, option);
		this.data = this.option.data;
	}

	var funs = Scale.prototype;

	funs.init = function(data) {
		yp = this.yp;
        this.yp.element.append(this.option.template);
		console.log("加载设定初始视角插件");
	};

	funs.save = function(cb, err) {
		var saveData = {};
		saveData.spaceId = this.yp.method.scene.getCurrScene().id;
		saveData.vlookat = this.yp.krpano.view.vlookat;
		saveData.hlookat = this.yp.krpano.view.hlookat;
		proxy.setScene(saveData, cb, err);
	}

	return Scale;
});
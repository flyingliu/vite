define("plugin/redpacket", ["jquery", "template"], function ($, template) {
	var currentHotspot;
	var hotspotArr = [];
	var isInfo;
	var DEFAULT_OPTION;
	var isMove;
	var redList;
	var length;
	var krpano;
	DEFAULT_OPTION = {
		//      element: function(data){
		//          console.log(data)
		//          var Link = "<div class='redpacket'></div>";
		//
		//          return urlLink;
		//      },
		isMove: false

	};

	function Redpacket(option) {
		var _this = this;
		this.option = option;
		this.options = $.extend(true, {}, DEFAULT_OPTION, option, {
			callback: {
				onClick: function(data) {
					_this.callwith("onClick", this, arguments);
				},
				onLoaded: function(data) {
					console.log("111111")
					_this.callwith("onLoaded", this, arguments);
					hotspotArr.push(this);
				}
					//				onMoveUpdate: function(data) {
					//					this.yp.plugin.redpacket.onmoveupdate(data);
					//				}
			}
		});
	}

	var funs = Redpacket.prototype;
	funs.deps = ["method/hotspot"];

	funs.init = function(data) {
		krpano = this.krpano;
		yp = this.yp;
		isInfo = getQueryString("index");
		for(var v in this.option.data) {
			var redId = this.option.data[v].status;
			var status = {
				0: "//code.aoliliya.com/vr/skin/720/images/heart.png",
				1: "//code.aoliliya.com/vr/skin/720/images/heart.png",
				2: "//code.aoliliya.com/vr/skin/720/images/heart.png"
			};
			this.option.data[v].style = null;
			if (isInfo == v) {
				this.option.data[v].url = status[1];
				this.option.data[v].isMove = true;
			} else {
				this.option.data[v].url = status[redId]
			}
		}
		this.options = $.extend(true, {}, DEFAULT_OPTION, this.option );
		console.log(this.option)
		this.redpacket = this.method.hotspot.register("redpacket", this.options);
		redList = this.getRedpacket();
		if(isInfo) {
			length = redList.length - 1;
		} else {
			length = redList.length;
		}
		console.log(redList)
			//      yp.plugin.redpacket.redpacket.hotspotList[0].setMove(true)
		var currRedHotspot;
		for(var i in redList) {
			yp.plugin.redpacket.redpacket.hotspotList[i].hotspot.scale = 0.4;
			if(isInfo) {
//				yp.plugin.redpacket.redpacket.hotspotList[isInfo].setMove(true);
				yp.plugin.redpacket.redpacket.hotspotList[isInfo].hotspot.keep = true;

//				setTimeout(function() {
//					this.krpano.view.vlookat = yp.plugin.redpacket.redpacket.hotspotList[isInfo].option.atv;
//					this.krpano.view.hlookat = yp.plugin.redpacket.redpacket.hotspotList[isInfo].option.ath;
//				}.bind(this), 50);
			}
		}
		if(!isInfo) {
			this.addredpacket();
		}
		var redsub = "当前场景红包：" + this.getRedpacket().length + "个";
		var random = '<div class="randomRed"><button class="random">随机摆放</button><p class="redpacketSub"></p></div>';
		$("#panoview").append(random);
		$(".redpacketSub").append(redsub);
		$("#panoview").find(".random,.yidongRed").on("click", function() {
			var ath = Math.random() * 360 - 180;
			var atv = Math.random() * 180 - 90;
			yp.plugin.redpacket.redpacket.hotspotList[length].hotspot.ath = ath;
			yp.plugin.redpacket.redpacket.hotspotList[length].hotspot.atv = atv;
		})
	};

	funs.callwith = function(type, _this, data, hotspot) {
		if(this.option.callback && typeof this.option.callback[type] === "function") {
			this.option.callback[type].call(_this, data);
		}
	};

	funs.addredpacket = function(data) {
		this.newhotspot = this.redpacket.addHotspot({
			style: null,
			url: "//code.aoliliya.com/vr/skin/720/images/heart.png",
			isMove: true,
			redid: "",
			element: '<div class="redpacket"></div>'
		});
		this.newhotspot.hotspot.keep = true;
		this.newhotspot.hotspot.scale = 0.4;
		return this.newhotspot;
	}

	funs.getRedData = function() {
		var redData = yp.plugin.redpacket.redpacket.hotspotList[length].hotspot;
		console.log(redData)
		return redData;
	}

	funs.removeredpacket = function(hotspot) {
		hotspot = hotspot || currentHotspot;
		console.log(hotspotArr)
		if(hotspot) {
			for(var i in hotspotArr) {
				if(hotspotArr[i] === hotspot) {
					hotspotArr.splice(i, 1);
					hotspot.remove();
				}
			}
		} else {
			hotspotArr = [];
		}

	};

	//	funs.onmoveupdate = function(data) {
	//		console.log(data)
	//	}

	funs.getRedpacket = function(name) {
		return this.redpacket.getHotspot(name);
	};

	//	funs.onNewSceneData = function() {
	//		for(var i in this.redpacket) {
	//			this.redpacket.addHotspot(this.redpacket);
	//		}
	//	};

	funs.onnewpano = function(hotspot) {
		this.krpano.view.vlookat = yp.plugin.redpacket.redpacket.hotspotList[length].getData().atv;
		this.krpano.view.hlookat = yp.plugin.redpacket.redpacket.hotspotList[length].getData().ath;
	}

	//	funs.onNewSceneCacheData = function() {
	//			this.removeredpacket(this.newhotspot);
	//			this.cacheData = [];
	//			for(var i in hotspotArr) {
	//				var spotObj = hotspotArr[i].getData();
	//				this.cacheData.push(spotObj);
	//			}
	//			hotspotArr = [];
	//			return this.cacheData;
	//	};

	return Redpacket;
});
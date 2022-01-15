define("method/util", function () {
  window.YP = window.YP || {};
  var util = function () { },
    funs = util.prototype;

  util.name = "util";

  funs.init = function () {
    this.device = this.krpano.device;
  }

  funs.include = function (url) {
    this.files = this.files || [];
    if (typeof url === "string" && this.files.indexOf(url) < 0) {
      this.files.push(url);
      this.krpano.call("loadxml('<krpano><include url=\"" + url + "\" /></krpano>')");
    }
  };

  funs.createItem = function (addName, name) {
    if (typeof this.krpano[addName].createItem != "function" || typeof this.krpano[addName].getArray != "function") {
      return;
    }

    var obj = this.krpano[addName].getItem(name);

    if (obj) {
      return obj;
    }

    obj = this.krpano[addName].createItem(name);
    obj.keep = true;
    //this.krpano[addName].getArray().push(obj);

    return obj;
  };

  funs.replaceUrl = function (url) {
    //return url.replace("pano/%SWFPATH%" ,"https://ypano.duc.cn/krpano");
    if (url && url.indexOf("%SWFPATH%") > -1) {
      var reg = new RegExp("^.*%SWFPATH%");
      var basePath = "/krpano";
      return basePath + url.replace(reg, "");
    } else if (url && url.indexOf("%BASEDIR%") > -1) {
      var reg = new RegExp("^.*%BASEDIR%");
      var basePath = "/";
      return basePath + url.replace(reg, "");
    } else {
      return url;
    }
  }

  funs.loading = function () {
    return $('<div class="loading"><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');
  };

  funs.browser = function () {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) && !(u.indexOf('iPad') > -1), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      aoliliya: u.indexOf('ally') > -1
    }
  };

  funs.hasTouch = function () {
    var touchObj = {};
    touchObj.isSupportTouch = "ontouchend" in document ? true : false;
    touchObj.isEvent = touchObj.isSupportTouch ? "touchstart" : "click";
    return touchObj.isEvent;
  };

  funs.isTouch = function () {
    var touchObj = {};
    touchObj.isSupportTouch = "ontouchend" in document ? true : false;
    return touchObj.isSupportTouch;
  };

  funs.strLength = function (str) {
    if (!str) return 0;
    var strlen = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        strlen += 2;
      } else {
        strlen++;
      }
    }
    return strlen;
  };

  YP.random = function (length) {
    var result = [];
    for (var i = 0; i < length; i++) {
      var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
      //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
      result.push(String.fromCharCode(97 + ranNum));
    }

    return result.join("");
  };

  return funs;
});
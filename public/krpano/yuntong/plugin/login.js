define("plugin/login", ["jquery", "template"], function ($, template) {
    var proxy;
    var loginHtml = '<div class="login">\
						<p>登录</p>\
						<div class="shuru">\
							<input type="text" class="username" placeholder="用户名或手机号"/>\
							<p class="nameerror"></p>\
							<input type="password" class="password" placeholder="密码"/>\
							<p class="worderror"></p>\
							<input type="submit" value="登录" class="submit" disabled="true"/>\
						</div>\
						<div>\
							<a>微信登录</a>\
							<a>忘记密码</a>\
							<a>注册账号</a>\
						</div>\
						<i class="close" />\
					</div>';

    function Login(option) {

    }

    var funs = Login.prototype;

    funs.init = function () {
        var _this = this;
        proxy = this.yp.proxy;
        this.yp.element.append(loginHtml);
        this.yp.element.find(".submit").on("click", function () {
            var user = $(".username").val().length;
            var pass = $(".password").val().length;
            if (!user > 0) {
                $(".nameerror").html("尚未填写用户名或手机号");
                $(".worderror").html("");
            } else if (!pass > 0) {
                $(".nameerror").html("");
                $(".worderror").html("尚未填写密码");
            } else {
                $(".worderror,.nameerror").html("");
            }


        })

        this.yp.element.find(".username,.password").on("blur", function () {
            var name = _this.yp.element.find(".username").val().length;
            var word = _this.yp.element.find(".password").val().length;
            if (!name > 0) {
                if (!word > 0) {
                    _this.yp.element.find(".submit").removeClass("curr").attr("disabled", true);
                    $(".worderror,.nameerror").html("");
                }
            }
        })
        this.yp.element.find(".username,.password").on("focus", function () {
            _this.yp.element.find(".submit").addClass("curr").attr("disabled", false);
        })

    }

    return Login;
});
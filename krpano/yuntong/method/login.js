define("method/login", ["proxy"], function(proxy) {
    function Login() {

    }

    var funs = Login.prototype;
    Login.name = "login";

    funs.isLogin = function() {
        return this.info ? true : false;
    };


    funs.init = function() {
        var _this = this;

           proxy.getLoginInfo({
               async: false
           }, function (data) {
               if (data.success) {
                   _this.info = data.data;
               }
           });
    };

    return funs;
});
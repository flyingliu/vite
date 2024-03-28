// 获取汉典SVG字符串

function getHanZiUnicodeHex(hanzi) {
    var unicode = hanzi.charCodeAt(0);
    return unicode.toString(16).toLocaleUpperCase();
}
 
var hanzi = '中';
var unicodeHex = getHanZiUnicodeHex(hanzi);
// https://img.zdic.net/kai/jbh/4E2D.gif
// https://img.zdic.net/kai/cn/4E2D.svg
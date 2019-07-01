/**
 * 页面获取参数方法
 * @param name
 * @returns
 */
var LocString = String(window.document.location.href);
function getQueryString(name) {
    var rs = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
    if (tmp = rs) {
        return decodeURI(tmp[2]);
    }
    // parameter cannot be found
    return "parameter cannot be found";
}

function format3(str){
    if (str.charAt(str.length-1) == "#"){
        return str.substr(0,str.length-1);
    }else {
        return str;
    }
}

var WARN_LOGIN = "please sign in first";
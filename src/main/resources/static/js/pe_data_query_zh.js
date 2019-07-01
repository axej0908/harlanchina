$(function(){
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	var type = getUrlParam("type")
	var lis = $(".pe_con_mn_list").find("li");
	if(type == "data"){
		lis.eq(4).addClass("current_bg").siblings().removeClass("current_bg");
	}else if(type == "credit"){
		lis.eq(5).addClass("current_bg").siblings().removeClass("current_bg");
	}

})

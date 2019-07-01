$(function(){   	
    //tab页一级菜单
	$(".tab_div").on("click","li",function(){
		$(this).addClass("tab_li_current").siblings().removeClass("tab_li_current");
	})
})
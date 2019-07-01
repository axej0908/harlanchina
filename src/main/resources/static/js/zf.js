$(function(){
	//tab切换
	$(".tb_mn").on("click","li",function(){
		$(this).addClass("mn_active").siblings().removeClass("mn_active")
		$(".tb_con").find(".con_item").hide().eq($(this).index()).show();
	})


})

$(function(){
	//tab页一级菜单
	$(".fix_memu").on("click","li",function(){
		$(this).addClass("memu_active").siblings().removeClass("memu_active");
	})
})
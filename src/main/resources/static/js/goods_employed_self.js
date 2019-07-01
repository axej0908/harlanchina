$(function(){
	//分类区域点击事件
	$(".zl_area").on("click",".zl_item",function(){
		$(this).addClass("zl_current").siblings().removeClass("zl_current")
	})
})

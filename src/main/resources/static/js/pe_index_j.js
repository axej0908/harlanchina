$(function(){
	//tab页一级菜单
	$(".tab_div").on("click","li",function(){
		$(this).addClass("tab_li_current").siblings().removeClass("tab_li_current");
		$(".con_list").find(".con").hide().eq($(this).index()).show();
	})
	//竞价采购删除
	//单个商品删除点击事件
	/*$(".order_list").on("click",".gd_item .gd_del_op",function(){
		if($(this).parents(".gd_item").siblings().length == 0){
			$(this).parents(".order_item").remove()
		}else{
			$(this).parents(".gd_item").remove()
		}
	})*/
	//订单删除事件
	/*$(".order_list").on("click",".order_item .order_del",function(){
		$(this).parents(".order_item").remove()
	})*/
	
	//易货删除
	//单个商品删除点击事件
	$(".order_list").on("click",".yh_gd_area .gd_del_op",function(){
		$(this).parents(".yh_gd_item").remove()
	})
	//订单删除事件
	$(".order_list").on("click",".yh_item .order_del",function(){
		$(this).parents(".yh_item").remove()
	})
	
	//免费找货删除
	//单个商品删除点击事件
	$(".order_list").on("click",".gd_item_zh .gd_del_op",function(){
		if($(this).parents(".gd_item").siblings().length == 0){
			$(this).parents(".order_item").remove()
		}else{
			$(this).parents(".gd_item").remove()
		}
	})
	//弹框关闭事件
	$("body").on("click",".alert_close,.alert_btn_b",function(){
		$(".alert_div").hide()
	})
})

$(function(){
	//tab页一级菜单
	$(".tab_div").on("click","li",function(){
		$(this).addClass("tab_li_current").siblings().removeClass("tab_li_current");
	})
	//二级tab页切换
	$(".con_tab").on("click","li",function(){
		var dis_left = $(this).width()*$(this).index()+"px"
		$(this).siblings(".con_sub_slide").css("left",dis_left);
		$(this).parent().siblings(".con_sub_list").find(".con_sub").eq($(this).index()).show().siblings().hide();
	})
	//查看物流弹框
	$(".con").on("click",".check_btn",function(){
		$(".alert_black").show();
		$(".alert_see_wl").show();
	})
	//取消订单弹框
	$(".con").on("click",".cancel_btn",function(){
		$(".alert_black").show();
		$(".alert_cansel_order").show();
	})
	//确认发货弹框
	/*$(".con").on("click",".confirm_btn",function(){
		$(".alert_black").show();
		$(".alert_wl_form").show();
	})*/
	$(".alert_wl").on("click",".alert_close",function(){
		$(".alert_wl").hide();
		$(".alert_black").hide();
	})
	//查看物流弹框关闭按钮点击事件
	$(".alert_win").on("click",".alert_close",function(){
		$(this).parents(".alert_win").hide();
		$(".alert_black").hide();
	})
//	$(".alert_black").on("click",function(){
//		$(".alert_win").hide();
//		$(".alert_black").show();
//	})

	/*$(".cansel_btn").on("click" , function () {
        $(".alert_black").hide();
        $(".alert_cansel_order").hide();
    })*/
})

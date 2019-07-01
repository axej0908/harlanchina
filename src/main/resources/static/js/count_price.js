$(function(){

	//添加收货地址点击事件
	$(".area_a_tip").on("click",".adr_add_btn",function(){
		$(".alert_balck").show();
		$(".alert_adr").show();
	});
	$(".adr_list").on("click",".adr_edit_btn",function(){
		$(".alert_balck").show();
		$(".alert_adr").show();
	});
	//平台服务
	/*$(".platform").on("click","li",function(){
		$(this).addClass("plat_active").siblings().removeClass("plat_active")
	})*/
	//地址列表收放点击事件
	$(".adr_list").on("click",".adr_up_btn",function(){
		if($(this).hasClass("adr_show")){
			$(this).removeClass("adr_show").addClass("adr_hide").html("Collapse address");
			$(".adr_list").find("tr").hide().eq(0).show();
		
		}else{
			$(this).addClass("adr_show").removeClass("adr_hide").html("pack up");
			$(".adr_list").find("tr").show();
		}
	});
	//弹框关闭事件
	$(".alert_adr").on("click",".alert_close",function(){
		$(".alert_balck").hide();
		$(".alert_adr").hide();
	});
	$(".entire").on("click",".alert_balck",function(){
		$(".alert_balck").hide();
		$(".alert_adr").hide();
	});
	
	//关闭
	$(".img").on("click", function () {
		$(".mask").hide();
		$(".opacity2").hide();
	});
});

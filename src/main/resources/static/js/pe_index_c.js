$(function(){
	//tab页一级菜单
	$(".tab_div").on("click","li",function(){
		$(this).addClass("tab_li_current").siblings().removeClass("tab_li_current");
		$(".con_list").find(".con").hide().eq($(this).index()).show();
	})
	//页面跳转
	//	参与竞价订单详情
	/*$(".order_list").on("click",".all_detail",function(){
		location.href = "pe_index_c_cyxq_a.html";
	})*/
	//	参与竞价商品详情
	/*$(".order_list").on("click",".detail_btn",function(){
		location.href = "pe_index_c_cyxq_b.html";
	})*/
	//	发起竞价订单查看
	/*$(".fq_order_list").on("click",".fq_all_detail",function(){
		location.href = "pe_index_c_fqxq_a.html";
	})*/
	//	发起竞价单个商品查看
	/*$(".fq_order_list").on("click",".fq_detail_btn",function(){
		location.href = "pe_index_c_fqxq_b.html";
	})*/
	//	发起竞价一键竞价者
	/*$(".fq_order_list").on("click",".fq_yjjj_btn",function(){
		location.href = "pe_index_c_fqxq_a.html";
	})*/
	//	发起竞价竞价者详情
	/*$(".fq_order_list").on("click",".fq_jjzxq_btn",function(){
		location.href = "pe_index_c_fqxq_b.html";
	})*/
})

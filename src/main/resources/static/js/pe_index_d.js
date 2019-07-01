$(function(){
	//tab页一级菜单
	$(".tab_div").on("click","li",function(){
		$(this).addClass("tab_li_current").siblings().removeClass("tab_li_current");
		// $(".con_list").find(".con").hide().eq($(this).index()).show();
	})
	
	//页面跳转
	//	参与采购订单详情
/*	$(".order_list").on("click",".all_detail",function(){
		location.href = "pe_index_d_cyxq_a.html";
	})
	//	参与采购商品详情
	$(".order_list").on("click",".detail_btn",function(){
		location.href = "pe_index_d_cyxq_b.html";
	})
	//	发起采购订单查看
	$(".fq_order_list").on("click",".fq_all_detail",function(){
		location.href = "pe_index_d_fqxq_a.html";
	})
	//	发起采购单个商品查看
	$(".fq_order_list").on("click",".fq_detail_btn",function(){
		location.href = "pe_index_d_fqxq_b.html";
	})
	//	发起采购一键竞价者
	$(".fq_order_list").on("click",".fq_yjjj_btn",function(){
		location.href = "pe_index_d_fqxq_a.html";
	})
	//	发起采购采购者详情
	$(".fq_order_list").on("click",".fq_jjzxq_btn",function(){
		location.href = "pe_index_d_fqxq_b.html";
	})*/
})

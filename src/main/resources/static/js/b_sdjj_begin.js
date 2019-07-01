$(function(){
    //搜索框tab页切换
    $(".search_box_mn").on("mouseover","li",function(){
    	$(this).siblings().removeClass("search_li_active");
    	$(this).addClass("search_li_active");
    	var input_box = $(".input_box").find("input");
    	switch($(this).index()){
    		case 0:
    			input_box.attr("placeholder","请输入供应商名称");
    			break;
			case 1:
    			input_box.attr("placeholder","请输入商品名称");
    			break;
			
    	}
    })
	$(".third_mn_con").on("click","li",function(){
		$(this).siblings().removeClass("third_li_active");
		$(this).addClass("third_li_active");
	})
	//点击分页带页码的按钮改变样式
	$(".pg_num").on("click","li",function(){
		$(this).siblings().removeClass("num_active");
		$(this).addClass("num_active")
	})
	//换也按钮
	$(".page_blo_sub").on("click",".pg_btn",function(){
		var li_dom = $(".pg_num").find("li");
		var num_val = li_dom.eq(0).html();
		var max_pg = parseInt($(".pg_count").find("span").html());
		if(li_dom.eq(li_dom.length-1).html() == max_pg){
			return;
		}
		for(var i=0;i<li_dom.length;i++){
			num_val ++;
			if(num_val  > max_pg){
				return;
			}else{
				li_dom.eq(i).html(num_val);
			}
		}
	})
	
	
	
	//页面跳转
	//发起竞价
	$(".con_til_sub").on("click",".til_logo,.til_txt",function(){
		location.href = "b_sdjj_fqjj.html";
	})
	//历史记录
	$(".his").on("click",".his_sub",function(){
		location.href = "b_sdjj_his.html";
	})
	//订单竞价详情
	/*$(".order_list").on("click",".all_detail",function(){
		location.href = "b_sdjj_detail_a.html";
	})*/
	//一键竞价
	/*$(".order_list").on("click",".all_jb",function(){
		location.href = "b_sdjj_jba.html";
	})*/
	//单个商品详情
	/*$(".order_list").on("click",".detail_btn",function(){
		location.href = "b_sdjj_detail_b.html";
	})*/
	//单个商品竞价
	/*$(".order_list").on("click",".jb_btn",function(){
		location.href = "b_sdjj_jbb.html";
	})*/
})

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
	//点击分页带页码的按钮改变样式
	/*$(".page_sub").on("click",".num_page",function(){

		$(".num_page").removeClass("num_active");
		$(this).addClass("num_active");
	})
	//跳页
	$(".goods_list").on("click",".btn_a",function(){
		location.href = "h_yhyh_cyyh.html";
	})
	$(".goods_list").on("click",".btn_b",function(){
		location.href = "h_yhyh_detail_a.html";
	})*/
})

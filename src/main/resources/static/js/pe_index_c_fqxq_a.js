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
    //图片轮播
	 var swiper = new Swiper('.swiper-container', {
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	     pagination: '.swiper-pagination',
        paginationClickable: true
    });
	//页面跳转
	//竞价商品查看详情
	/*$(".swiper-wrapper").on("click",".enter_price_btn",function(){
		location.href = "pe_index_c_fqxq_b.html";
	})*/
	//竞价商品查看详情
	/*$(".tlt_yjjjz_list").on("click",".yjjb_btn",function(){
		location.href = "pe_index_c_cyxq.html";
	})*/
    $("body").on("click",".alert_close,.alert_btn_b",function(){
        $(".alert_div").hide()
    })
})

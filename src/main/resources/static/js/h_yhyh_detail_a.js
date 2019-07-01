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
	 /*var swiper = new Swiper('.swiper-container', {
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	     pagination: '.swiper-pagination',
        paginationClickable: true
    });*/
    //
    $(".third_left_one").on("click",".yjjb_btn",function(){
    	if(!$(this).hasClass('entered_btn')){
    		$(this).addClass('entered_btn').html("已参与");
    	}
    })
	//跳页
	/*$(".third_left_two").on("click",".enter_price_btn",function(){
		location.href = "h_yhyh_detail_sale.html";
	})*/
	/*$(".third_left_three").on("click",".enter_price_btn",function(){
		location.href = "h_yhyh_detail_change.html";
	})*/
})

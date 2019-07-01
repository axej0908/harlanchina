$(function(){
	//图片轮播
	 var swiper = new Swiper('.swiper-container', {
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',
	        slidesPerView: 3,
	        spaceBetween: 10,
	    });
	    //搜索框tab页切换
	    $(".search_box_mn").on("mouseover","li",function(){
	    	$(this).siblings().removeClass("search_li_active");
	    	$(this).addClass("search_li_active");
	    	var input_box = $(".input_box").find("input");
	    	switch($(this).index()){
	    		case 0:
	    			input_box.attr("placeholder","请输入CAS号、化合物名称");
	    			break;
    			case 1:
	    			input_box.attr("placeholder","买现货");
	    			break;
    			case 2:
	    			input_box.attr("placeholder","搜百科");
	    			break;
    			case 3:
    				input_box.attr("placeholder","搜供应商");
	    			break;
	    	}
	    })
	    //搜索框下方商品区域tab页切换
      	$(".good_mn").on("mouseover","li",function(){
	    	$(this).siblings().removeClass("good_li_active");
	    	$(this).addClass("good_li_active");
	    	var good_con = $(".goods_area").find(".good_con");
	    	good_con.hide()
	    	good_con.eq($(this).index()).show();
	    })
})